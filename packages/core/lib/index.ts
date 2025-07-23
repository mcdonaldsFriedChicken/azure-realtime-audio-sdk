import type { WebSocketClientOptions } from 'easy-websocket-client';
import type { RealtimeRealtimeRequestCommandType, RealtimeRealtimeRequestItem, RealtimeRealtimeRequestResponseCreateCommand, RealtimeRealtimeRequestSessionUpdateCommand, RealtimeRealtimeResponseCommandType, RealtimeRequestCommand, RealtimeResponseCommand } from './api';
import type { ModelStatusType } from './constants';
import WebSocketClient from 'easy-websocket-client';
import EventEmitter from 'eventemitter3';
import { RealtimeRequestCommandEnum, RealtimeResponseCommandEnum } from './api';
import { DEFAULT_SESSION_CONFIG, ModelStatusEnum } from './constants';

/**
 * Configuration options for initializing the Azure Real-time Audio SDK client
 */
interface AzureRealTimeAudioOptions {
  /**
   * Azure OpenAI service hostname (e.g., 'your-resource.openai.azure.com')
   */
  hostName: string;
  /**
   * API version string (e.g., '2024-10-01-preview')
   */
  apiVersion: string;
  /**
   * Model deployment name configured in Azure OpenAI
   */
  deployment: string;
  /**
   * API key for authentication with Azure OpenAI service
   */
  apiKey: string;
  /**
   * Optional session configuration to override defaults
   */
  sessionConfig?: RealtimeRealtimeRequestSessionUpdateCommand['session'];
}

/**
 * Azure Real-time Audio SDK client for OpenAI Realtime API
 * Provides WebSocket-based real-time audio communication with Azure OpenAI
 */
export class AzureRealTimeAudio {
  #client: WebSocketClient;
  #eventEmitter = new EventEmitter<RealtimeRealtimeResponseCommandType>();
  #initialized = false;
  #status: ModelStatusType = ModelStatusEnum.IDLE;
  /**
   * Creates a new Azure Real-time Audio client instance and establishes WebSocket connection
   * @param options - Configuration options including hostname, API version, deployment name, and API key
   * @param websocketOptions - Optional WebSocket client configuration such as connection timeout and retry settings
   * @param WebSocketImpl - Optional custom WebSocket implementation (useful for Node.js environments)
   */
  constructor(options: AzureRealTimeAudioOptions, websocketOptions?: WebSocketClientOptions, WebSocketImpl?: typeof WebSocket) {
    const url = `wss://${options.hostName}/openai/realtime?api-version=${options.apiVersion}&deployment=${options.deployment}&api-key=${options.apiKey}`;
    this.#client = new WebSocketClient(url, {
      jsonAble: true,
      ...websocketOptions,
    }, WebSocketImpl);

    const sessionConfig = options.sessionConfig ?? DEFAULT_SESSION_CONFIG;

    this.#client.on('open', () => {
      this.send<RealtimeRequestCommandEnum.SESSION_UPDATE>({
        type: RealtimeRequestCommandEnum.SESSION_UPDATE,
        session: sessionConfig,
      });
    });

    this.#client.on('message', (message) => {
      if (typeof message === 'object') {
        switch (message.type as RealtimeResponseCommandEnum) {
          case RealtimeResponseCommandEnum.SESSION_UPDATED:
            if (!this.#initialized) {
              this.#eventEmitter.emit(RealtimeResponseCommandEnum.INIT, message as RealtimeResponseCommand<RealtimeResponseCommandEnum.INIT>);
              this.#initialized = true;
              return;
            }

            break;

          case RealtimeResponseCommandEnum.INPUT_AUDIO_BUFFER_SPEECH_STARTED:
            if (this.#status === ModelStatusEnum.THINKING) {
              this.send<RealtimeRequestCommandEnum.RESPONSE_CANCEL>(
                {
                  type: RealtimeRequestCommandEnum.RESPONSE_CANCEL,
                },
              );
            }
            this.#status = ModelStatusEnum.LISTENING;
            break;

          case RealtimeResponseCommandEnum.RESPONSE_CREATED:
            this.#status = ModelStatusEnum.THINKING;

            break;

          case RealtimeResponseCommandEnum.RESPONSE_DONE:
            this.#status = ModelStatusEnum.SPEAKING;

            break;

          default:
            break;
        }
        this.#eventEmitter.emit(message.type as RealtimeRealtimeResponseCommandType, message as RealtimeResponseCommand<RealtimeRealtimeResponseCommandType>);
      }
    });
  }

  /**
   * Register an event listener for real-time response events from the Azure OpenAI service
   * @param event - The specific event type to listen for (e.g., 'response.audio.delta', 'session.updated')
   * @param listener - Callback function that will be invoked when the event occurs, receives event data as parameter
   */
  on<T extends RealtimeRealtimeResponseCommandType>(event: T, listener: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.on(event as string, listener);
  }

  /**
   * Register a one-time event listener that will be automatically removed after first trigger
   * @param event - The specific event type to listen for once (e.g., 'session.created', 'response.done')
   * @param listener - Callback function that will be invoked only once when the event occurs
   */
  once<T extends RealtimeRealtimeResponseCommandType>(event: T, listener: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.once(event as string, listener);
  }

  /**
   * Close the WebSocket connection and cleanup resources
   */
  close() {
    this.#client.close();
  }

  /**
   * Send a command message to the Azure OpenAI Realtime API
   * @param message - The command object containing type and payload data according to API specification
   */
  send<T extends RealtimeRealtimeRequestCommandType>(message: RealtimeRequestCommand<T>) {
    this.#client.send(message);
  }

  /**
   * Remove a specific event listener or all listeners for an event type
   * @param event - The event type to remove listener from (e.g., 'response.audio.delta')
   * @param listener - The specific listener function to remove; if not provided, removes all listeners for the event
   */
  off<T extends RealtimeRealtimeResponseCommandType>(event: T, listener?: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.off(event as string, listener);
  }

  /**
   * Remove all registered event listeners for all event types
   */
  offAll() {
    this.#eventEmitter.removeAllListeners();
  }

  /**
   * Append base64-encoded audio data to the input buffer for processing
   * @param audio - Base64-encoded audio data string (PCM16 format by default)
   */
  appendAudio(audio: string) {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_APPEND>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_APPEND,
      audio,
    });
  }

  /**
   * Commit the current audio buffer content to trigger processing by the model
   */
  commitAudio() {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_COMMIT>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_COMMIT,
    });
  }

  /**
   * Clear all audio data from the input buffer
   */
  clearAudioBuffer() {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_CLEAR>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_CLEAR,
    });
  }

  /**
   * Create a new conversation item and add it to the conversation context
   * @param item - The conversation item object (message, function call, or function output)
   * @param previous_item_id - Optional ID of the item after which to insert this new item
   */
  createConversationItem(item: RealtimeRealtimeRequestItem, previous_item_id?: string) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_CREATE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_CREATE,
      item,
      previous_item_id,
    });
  }

  /**
   * Delete a conversation item from the conversation context
   * @param item_id - Unique identifier of the conversation item to remove
   */
  deleteItem(item_id: string) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_DELETE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_DELETE,
      item_id,
    });
  }

  /**
   * Truncate a conversation item at a specific point, useful for editing or correcting
   * @param item_id - Unique identifier of the conversation item to truncate
   * @param content_index - Index of the content part where truncation should occur
   * @param audio_end_ms - Timestamp in milliseconds where audio should be cut off
   */
  truncateItem(item_id: string, content_index: number, audio_end_ms: number) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_TRUNCATE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_TRUNCATE,
      item_id,
      content_index,
      audio_end_ms,
    });
  }

  /**
   * Trigger the model to generate a response based on current conversation context
   * @param response - Optional response configuration including modalities, voice, tools, and generation parameters
   */
  createResponse(response?: RealtimeRealtimeRequestResponseCreateCommand['response']) {
    this.send<RealtimeRequestCommandEnum.RESPONSE_CREATE>({
      type: RealtimeRequestCommandEnum.RESPONSE_CREATE,
      ...(response && { response }),
    });
  }

  /**
   * Cancel the currently active response generation from the model
   */
  cancelResponse() {
    this.send<RealtimeRequestCommandEnum.RESPONSE_CANCEL>({
      type: RealtimeRequestCommandEnum.RESPONSE_CANCEL,
    });
  }

  /**
   * Get the current operational status of the model (idle, listening, thinking, speaking)
   * @returns The current model status
   */
  get status() {
    return this.#status;
  }

  /**
   * Set the internal model status to a specific state
   * @param value - The new status value (idle, listening, thinking, or speaking)
   */
  set status(value: ModelStatusType) {
    this.#status = value;
  }

  /**
   * Mark the model as finished speaking and set status back to idle
   */
  setModelSpeakDone() {
    this.#status = ModelStatusEnum.IDLE;
  }

  /**
   * Get the current WebSocket connection state (connecting, open, closing, closed)
   * @returns The WebSocket connection state
   */
  get state() {
    return this.#client.state;
  }

  /**
   * Check if the client has completed initialization and is ready for use
   * @returns True if client is initialized and ready
   */
  get isInitialized() {
    return this.#initialized;
  }
}

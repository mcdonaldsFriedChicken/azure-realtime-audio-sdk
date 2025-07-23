import type { WebSocketClientOptions } from 'easy-websocket-client';
import type { RealtimeRealtimeRequestCommandType, RealtimeRealtimeRequestItem, RealtimeRealtimeRequestResponseCreateCommand, RealtimeRealtimeRequestSessionUpdateCommand, RealtimeRealtimeResponseCommandType, RealtimeRequestCommand, RealtimeResponseCommand } from './api';
import type { ModelStatusType } from './constants';
import WebSocketClient from 'easy-websocket-client';
import EventEmitter from 'eventemitter3';
import { RealtimeRequestCommandEnum, RealtimeResponseCommandEnum } from './api';
import { DEFAULT_SESSION_CONFIG, ModelStatusEnum } from './constants';

interface AzureRealTimeAudioOptions {
  hostName: string;
  apiVersion: string;
  deployment: string;
  apiKey: string;
  sessionConfig?: RealtimeRealtimeRequestSessionUpdateCommand['session'];
}

export class AzureRealTimeAudio {
  #client: WebSocketClient;
  #eventEmitter = new EventEmitter<RealtimeRealtimeResponseCommandType>();
  #initialized = false;
  #status: ModelStatusType = ModelStatusEnum.IDLE;
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

  on<T extends RealtimeRealtimeResponseCommandType>(event: T, listener: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.on(event as string, listener);
  }

  once<T extends RealtimeRealtimeResponseCommandType>(event: T, listener: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.once(event as string, listener);
  }

  close() {
    this.#client.close();
  }

  send<T extends RealtimeRealtimeRequestCommandType>(message: RealtimeRequestCommand<T>) {
    this.#client.send(message);
  }

  off<T extends RealtimeRealtimeResponseCommandType>(event: T, listener?: (data: RealtimeResponseCommand<T>) => void) {
    this.#eventEmitter.off(event as string, listener);
  }

  offAll() {
    this.#eventEmitter.removeAllListeners();
  }

  /**
   * Append audio to the audio buffer.
   * @param audio - The audio to append. (base64 encoded)
   */
  appendAudio(audio: string) {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_APPEND>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_APPEND,
      audio,
    });
  }

  commitAudio() {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_COMMIT>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_COMMIT,
    });
  }

  clearAudioBuffer() {
    this.send<RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_CLEAR>({
      type: RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_CLEAR,
    });
  }

  createConversationItem(item: RealtimeRealtimeRequestItem, previous_item_id?: string) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_CREATE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_CREATE,
      item,
      previous_item_id,
    });
  }

  deleteItem(item_id: string) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_DELETE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_DELETE,
      item_id,
    });
  }

  truncateItem(item_id: string, content_index: number, audio_end_ms: number) {
    this.send<RealtimeRequestCommandEnum.CONVERSATION_ITEM_TRUNCATE>({
      type: RealtimeRequestCommandEnum.CONVERSATION_ITEM_TRUNCATE,
      item_id,
      content_index,
      audio_end_ms,
    });
  }

  createResponse(response?: RealtimeRealtimeRequestResponseCreateCommand['response']) {
    this.send<RealtimeRequestCommandEnum.RESPONSE_CREATE>({
      type: RealtimeRequestCommandEnum.RESPONSE_CREATE,
      ...(response && { response }),
    });
  }

  cancelResponse() {
    this.send<RealtimeRequestCommandEnum.RESPONSE_CANCEL>({
      type: RealtimeRequestCommandEnum.RESPONSE_CANCEL,
    });
  }

  get status() {
    return this.#status;
  }

  set status(value: ModelStatusType) {
    this.#status = value;
  }

  setModelSpeakDone() {
    this.#status = ModelStatusEnum.IDLE;
  }

  get state() {
    return this.#client.state;
  }

  get isInitialized() {
    return this.#initialized;
  }
}

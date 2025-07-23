import type { WebSocketClientOptions } from 'easy-websocket-client';
import type { RealtimeRealtimeRequestCommandType, RealtimeRealtimeRequestSessionUpdateCommand, RealtimeRealtimeResponseCommandType, RealtimeRequestCommand, RealtimeResponseCommand } from './api';
import WebSocketClient from 'easy-websocket-client';
import EventEmitter from 'eventemitter3';
import { RealtimeRequestCommandEnum, RealtimeResponseCommandEnum } from './api';
import { DEFAULT_SESSION_CONFIG } from './constants';

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
        if (message.type === RealtimeResponseCommandEnum.SESSION_UPDATED) {
          if (!this.#initialized) {
            this.#eventEmitter.emit(RealtimeResponseCommandEnum.INIT, message as RealtimeResponseCommand<RealtimeResponseCommandEnum.INIT>);
            this.#initialized = true;
            return;
          }
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
}

import type { RealtimeRealtimeRequestSessionUpdateCommand } from './api';

export const DEFAULT_SESSION_CONFIG: RealtimeRealtimeRequestSessionUpdateCommand['session'] = {
  voice: 'alloy',
  instructions: 'Call provided tools if appropriate for the user\'s input.',
  input_audio_format: 'pcm16',
  input_audio_transcription: {
    model: 'whisper-1',
  },
  turn_detection: {
    threshold: 0.4,
    silence_duration_ms: 600,
    type: 'server_vad',
  },
};

export enum ModelStatusEnum {
  /**
   * The model is idle.
   * 闲置中
   */
  IDLE = 'idle',
  /**
   * The model is listening to the user.
   * 聆听中
   */
  LISTENING = 'listening',
  /**
   * The model is thinking.
   * 思考中
   */
  THINKING = 'thinking',
  /**
   * The model is speaking.
   * 回答中
   */
  SPEAKING = 'speaking',
}
export type ModelStatusType = ModelStatusEnum | `${ModelStatusEnum}`;

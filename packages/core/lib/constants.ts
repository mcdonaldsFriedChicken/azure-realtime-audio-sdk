import type { RealtimeRealtimeRequestSessionUpdateCommand } from './api';

/**
 * Default session configuration for Azure OpenAI Realtime API
 * Provides sensible defaults for voice, audio format, transcription, and turn detection
 */
export const DEFAULT_SESSION_CONFIG: RealtimeRealtimeRequestSessionUpdateCommand['session'] = {
  /**
   * Voice model to use for audio generation (alloy, shimmer, echo)
   */
  voice: 'alloy',
  /**
   * System instructions for the AI model behavior
   */
  instructions: 'Call provided tools if appropriate for the user\'s input.',
  /**
   * Input audio format specification (pcm16, g711_ulaw, g711_alaw)
   */
  input_audio_format: 'pcm16',
  /**
   * Audio transcription settings for input speech
   */
  input_audio_transcription: {
    /**
     * Transcription model to use (whisper-1)
     */
    model: 'whisper-1',
  },
  /**
   * Voice activity detection configuration for turn detection
   */
  turn_detection: {
    /**
     * Sensitivity threshold for voice detection (0.0 to 1.0)
     */
    threshold: 0.4,
    /**
     * Duration of silence before considering speech ended (in milliseconds)
     */
    silence_duration_ms: 600,
    /**
     * Type of turn detection mechanism (server_vad)
     */
    type: 'server_vad',
  },
};

/**
 * Enum representing the different states of the AI model
 */
export enum ModelStatusEnum {
  /**
   * The model is idle - 模型空闲状态
   */
  IDLE = 'idle',
  /**
   * The model is listening to user input - 模型正在聆听用户输入
   */
  LISTENING = 'listening',
  /**
   * The model is processing and thinking - 模型正在思考处理
   */
  THINKING = 'thinking',
  /**
   * The model is speaking/responding - 模型正在回答输出
   */
  SPEAKING = 'speaking',
}
/**
 * Union type for model status values
 */
export type ModelStatusType = ModelStatusEnum | `${ModelStatusEnum}`;

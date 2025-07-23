import type {
  RealtimeRealtimeRequestCommandType,
  RealtimeRealtimeRequestInputAudioBufferAppendCommand,
  RealtimeRealtimeRequestInputAudioBufferClearCommand,
  RealtimeRealtimeRequestInputAudioBufferCommitCommand,
  RealtimeRealtimeRequestItemCreateCommand,
  RealtimeRealtimeRequestItemDeleteCommand,
  RealtimeRealtimeRequestItemTruncateCommand,
  RealtimeRealtimeRequestResponseCancelCommand,
  RealtimeRealtimeRequestResponseCreateCommand,
  RealtimeRealtimeRequestSessionUpdateCommand,
  RealtimeRealtimeResponseAudioDeltaCommand,
  RealtimeRealtimeResponseAudioDoneCommand,
  RealtimeRealtimeResponseAudioTranscriptDeltaCommand,
  RealtimeRealtimeResponseAudioTranscriptDoneCommand,
  RealtimeRealtimeResponseCommandType,
  RealtimeRealtimeResponseContentPartAddedCommand,
  RealtimeRealtimeResponseContentPartDoneCommand,
  RealtimeRealtimeResponseCreatedCommand,
  RealtimeRealtimeResponseDoneCommand,
  RealtimeRealtimeResponseErrorCommand,
  RealtimeRealtimeResponseFunctionCallArgumentsDeltaCommand,
  RealtimeRealtimeResponseFunctionCallArgumentsDoneCommand,
  RealtimeRealtimeResponseInputAudioBufferClearedCommand,
  RealtimeRealtimeResponseInputAudioBufferCommittedCommand,
  RealtimeRealtimeResponseInputAudioBufferSpeechStartedCommand,
  RealtimeRealtimeResponseInputAudioBufferSpeechStoppedCommand,
  RealtimeRealtimeResponseItemCreatedCommand,
  RealtimeRealtimeResponseItemDeletedCommand,
  RealtimeRealtimeResponseItemInputAudioTranscriptionCompletedCommand,
  RealtimeRealtimeResponseItemInputAudioTranscriptionFailedCommand,
  RealtimeRealtimeResponseItemTruncatedCommand,
  RealtimeRealtimeResponseOutputItemAddedCommand,
  RealtimeRealtimeResponseOutputItemDoneCommand,
  RealtimeRealtimeResponseRateLimitsUpdatedCommand,
  RealtimeRealtimeResponseSessionCreatedCommand,
  RealtimeRealtimeResponseSessionUpdatedCommand,
  RealtimeRealtimeResponseTextDeltaCommand,
  RealtimeRealtimeResponseTextDoneCommand,
} from './types.gen';

/**
 * Enum for Azure OpenAI Realtime API request command types
 */
export enum RealtimeRequestCommandEnum {
  /**
   * Update session configuration - 更新会话配置
   */
  SESSION_UPDATE = 'session.update',
  /**
   * Append audio data to buffer - 向音频缓冲区追加数据
   */
  INPUT_AUDIO_BUFFER_APPEND = 'input_audio_buffer.append',
  /**
   * Commit audio buffer for processing - 提交音频缓冲区进行处理
   */
  INPUT_AUDIO_BUFFER_COMMIT = 'input_audio_buffer.commit',
  /**
   * Clear the audio buffer - 清空音频缓冲区
   */
  INPUT_AUDIO_BUFFER_CLEAR = 'input_audio_buffer.clear',
  /**
   * Create a conversation item - 创建对话项
   */
  CONVERSATION_ITEM_CREATE = 'conversation.item.create',
  /**
   * Delete a conversation item - 删除对话项
   */
  CONVERSATION_ITEM_DELETE = 'conversation.item.delete',
  /**
   * Truncate a conversation item - 截断对话项
   */
  CONVERSATION_ITEM_TRUNCATE = 'conversation.item.truncate',
  /**
   * Create a response from the model - 创建模型响应
   */
  RESPONSE_CREATE = 'response.create',
  /**
   * Cancel current response generation - 取消当前响应生成
   */
  RESPONSE_CANCEL = 'response.cancel',
}

/**
 * Enum for Azure OpenAI Realtime API response command types
 */
export enum RealtimeResponseCommandEnum {
  /**
   * Initial connection established - 初始连接建立
   */
  INIT = 'init',
  /**
   * Session created successfully - 会话成功创建
   */
  SESSION_CREATED = 'session.created',
  /**
   * Session configuration updated - 会话配置已更新
   */
  SESSION_UPDATED = 'session.updated',
  /**
   * Conversation item created - 对话项已创建
   */
  CONVERSATION_ITEM_CREATED = 'conversation.item.created',
  /**
   * Conversation item deleted - 对话项已删除
   */
  CONVERSATION_ITEM_DELETED = 'conversation.item.deleted',
  /**
   * Conversation item truncated - 对话项已截断
   */
  CONVERSATION_ITEM_TRUNCATED = 'conversation.item.truncated',
  /**
   * Response generation started - 响应生成开始
   */
  RESPONSE_CREATED = 'response.created',
  /**
   * Response generation completed - 响应生成完成
   */
  RESPONSE_DONE = 'response.done',
  /**
   * Rate limits information updated - 速率限制信息已更新
   */
  RATE_LIMITS_UPDATED = 'rate_limits.updated',
  /**
   * Response output item added - 响应输出项已添加
   */
  RESPONSE_OUTPUT_ITEM_ADDED = 'response.output_item.added',
  /**
   * Response output item completed - 响应输出项已完成
   */
  RESPONSE_OUTPUT_ITEM_DONE = 'response.output_item.done',
  /**
   * Response content part added - 响应内容部分已添加
   */
  RESPONSE_CONTENT_PART_ADDED = 'response.content_part.added',
  /**
   * Response content part completed - 响应内容部分已完成
   */
  RESPONSE_CONTENT_PART_DONE = 'response.content_part.done',
  /**
   * Audio data chunk received - 音频数据块已接收
   */
  RESPONSE_AUDIO_DELTA = 'response.audio.delta',
  /**
   * Audio stream completed - 音频流已完成
   */
  RESPONSE_AUDIO_DONE = 'response.audio.done',
  /**
   * Audio transcript chunk received - 音频转写块已接收
   */
  RESPONSE_AUDIO_TRANSCRIPT_DELTA = 'response.audio_transcript.delta',
  /**
   * Audio transcript completed - 音频转写已完成
   */
  RESPONSE_AUDIO_TRANSCRIPT_DONE = 'response.audio_transcript.done',
  /**
   * Text content chunk received - 文本内容块已接收
   */
  RESPONSE_TEXT_DELTA = 'response.text.delta',
  /**
   * Text content completed - 文本内容已完成
   */
  RESPONSE_TEXT_DONE = 'response.text.done',
  /**
   * Function call arguments chunk received - 函数调用参数块已接收
   */
  RESPONSE_FUNCTION_CALL_ARGUMENTS_DELTA = 'response.function_call_arguments.delta',
  /**
   * Function call arguments completed - 函数调用参数已完成
   */
  RESPONSE_FUNCTION_CALL_ARGUMENTS_DONE = 'response.function_call_arguments.done',
  /**
   * User speech started detected - 检测到用户开始说话
   */
  INPUT_AUDIO_BUFFER_SPEECH_STARTED = 'input_audio_buffer.speech_started',
  /**
   * User speech stopped detected - 检测到用户停止说话
   */
  INPUT_AUDIO_BUFFER_SPEECH_STOPPED = 'input_audio_buffer.speech_stopped',
  /**
   * Audio transcription completed - 音频转写完成
   */
  CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED = 'conversation.item.input_audio_transcription.completed',
  /**
   * Audio transcription failed - 音频转写失败
   */
  CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_FAILED = 'conversation.item.input_audio_transcription.failed',
  /**
   * Audio buffer committed - 音频缓冲区已提交
   */
  INPUT_AUDIO_BUFFER_COMMITTED = 'input_audio_buffer.committed',
  /**
   * Audio buffer cleared - 音频缓冲区已清空
   */
  INPUT_AUDIO_BUFFER_CLEARED = 'input_audio_buffer.cleared',
  /**
   * Error occurred - 发生错误
   */
  ERROR = 'error',
}

/**
 * Type mapping interface for response commands
 */
interface RealtimeResponseTypeMap {
  [RealtimeResponseCommandEnum.INIT]: RealtimeRealtimeResponseSessionUpdatedCommand;
  [RealtimeResponseCommandEnum.SESSION_CREATED]: RealtimeRealtimeResponseSessionCreatedCommand;
  [RealtimeResponseCommandEnum.SESSION_UPDATED]: RealtimeRealtimeResponseSessionUpdatedCommand;
  [RealtimeResponseCommandEnum.CONVERSATION_ITEM_CREATED]: RealtimeRealtimeResponseItemCreatedCommand;
  [RealtimeResponseCommandEnum.CONVERSATION_ITEM_DELETED]: RealtimeRealtimeResponseItemDeletedCommand;
  [RealtimeResponseCommandEnum.CONVERSATION_ITEM_TRUNCATED]: RealtimeRealtimeResponseItemTruncatedCommand;
  [RealtimeResponseCommandEnum.RESPONSE_CREATED]: RealtimeRealtimeResponseCreatedCommand;
  [RealtimeResponseCommandEnum.RESPONSE_DONE]: RealtimeRealtimeResponseDoneCommand;
  [RealtimeResponseCommandEnum.RATE_LIMITS_UPDATED]: RealtimeRealtimeResponseRateLimitsUpdatedCommand;
  [RealtimeResponseCommandEnum.RESPONSE_OUTPUT_ITEM_ADDED]: RealtimeRealtimeResponseOutputItemAddedCommand;
  [RealtimeResponseCommandEnum.RESPONSE_OUTPUT_ITEM_DONE]: RealtimeRealtimeResponseOutputItemDoneCommand;
  [RealtimeResponseCommandEnum.RESPONSE_CONTENT_PART_ADDED]: RealtimeRealtimeResponseContentPartAddedCommand;
  [RealtimeResponseCommandEnum.RESPONSE_CONTENT_PART_DONE]: RealtimeRealtimeResponseContentPartDoneCommand;
  [RealtimeResponseCommandEnum.RESPONSE_AUDIO_DELTA]: RealtimeRealtimeResponseAudioDeltaCommand;
  [RealtimeResponseCommandEnum.RESPONSE_AUDIO_DONE]: RealtimeRealtimeResponseAudioDoneCommand;
  [RealtimeResponseCommandEnum.RESPONSE_AUDIO_TRANSCRIPT_DELTA]: RealtimeRealtimeResponseAudioTranscriptDeltaCommand;
  [RealtimeResponseCommandEnum.RESPONSE_AUDIO_TRANSCRIPT_DONE]: RealtimeRealtimeResponseAudioTranscriptDoneCommand;
  [RealtimeResponseCommandEnum.RESPONSE_TEXT_DELTA]: RealtimeRealtimeResponseTextDeltaCommand;
  [RealtimeResponseCommandEnum.RESPONSE_TEXT_DONE]: RealtimeRealtimeResponseTextDoneCommand;
  [RealtimeResponseCommandEnum.RESPONSE_FUNCTION_CALL_ARGUMENTS_DELTA]: RealtimeRealtimeResponseFunctionCallArgumentsDeltaCommand;
  [RealtimeResponseCommandEnum.RESPONSE_FUNCTION_CALL_ARGUMENTS_DONE]: RealtimeRealtimeResponseFunctionCallArgumentsDoneCommand;
  [RealtimeResponseCommandEnum.INPUT_AUDIO_BUFFER_SPEECH_STARTED]: RealtimeRealtimeResponseInputAudioBufferSpeechStartedCommand;
  [RealtimeResponseCommandEnum.INPUT_AUDIO_BUFFER_SPEECH_STOPPED]: RealtimeRealtimeResponseInputAudioBufferSpeechStoppedCommand;
  [RealtimeResponseCommandEnum.CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED]: RealtimeRealtimeResponseItemInputAudioTranscriptionCompletedCommand;
  [RealtimeResponseCommandEnum.CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_FAILED]: RealtimeRealtimeResponseItemInputAudioTranscriptionFailedCommand;
  [RealtimeResponseCommandEnum.INPUT_AUDIO_BUFFER_COMMITTED]: RealtimeRealtimeResponseInputAudioBufferCommittedCommand;
  [RealtimeResponseCommandEnum.INPUT_AUDIO_BUFFER_CLEARED]: RealtimeRealtimeResponseInputAudioBufferClearedCommand;
  [RealtimeResponseCommandEnum.ERROR]: RealtimeRealtimeResponseErrorCommand;
}

/**
 * Generic type for response commands based on command type
 * @template T - The command type
 */
export type RealtimeResponseCommand<T extends RealtimeRealtimeResponseCommandType | RealtimeResponseCommandEnum>
  = T extends keyof RealtimeResponseTypeMap ? RealtimeResponseTypeMap[T] : never;

/**
 * Type mapping interface for request commands
 */
interface RealtimeRequestTypeMap {
  [RealtimeRequestCommandEnum.SESSION_UPDATE]: RealtimeRealtimeRequestSessionUpdateCommand;
  [RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_APPEND]: RealtimeRealtimeRequestInputAudioBufferAppendCommand;
  [RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_COMMIT]: RealtimeRealtimeRequestInputAudioBufferCommitCommand;
  [RealtimeRequestCommandEnum.INPUT_AUDIO_BUFFER_CLEAR]: RealtimeRealtimeRequestInputAudioBufferClearCommand;
  [RealtimeRequestCommandEnum.CONVERSATION_ITEM_CREATE]: RealtimeRealtimeRequestItemCreateCommand;
  [RealtimeRequestCommandEnum.CONVERSATION_ITEM_DELETE]: RealtimeRealtimeRequestItemDeleteCommand;
  [RealtimeRequestCommandEnum.CONVERSATION_ITEM_TRUNCATE]: RealtimeRealtimeRequestItemTruncateCommand;
  [RealtimeRequestCommandEnum.RESPONSE_CREATE]: RealtimeRealtimeRequestResponseCreateCommand;
  [RealtimeRequestCommandEnum.RESPONSE_CANCEL]: RealtimeRealtimeRequestResponseCancelCommand;
}

/**
 * Generic type for request commands based on command type
 * @template T - The command type
 */
export type RealtimeRequestCommand<T extends RealtimeRealtimeRequestCommandType | RealtimeRequestCommandEnum>
  = T extends keyof RealtimeRequestTypeMap ? RealtimeRequestTypeMap[T] : never;

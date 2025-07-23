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

export enum RealtimeRequestCommandEnum {
  SESSION_UPDATE = 'session.update',
  INPUT_AUDIO_BUFFER_APPEND = 'input_audio_buffer.append',
  INPUT_AUDIO_BUFFER_COMMIT = 'input_audio_buffer.commit',
  INPUT_AUDIO_BUFFER_CLEAR = 'input_audio_buffer.clear',
  CONVERSATION_ITEM_CREATE = 'conversation.item.create',
  CONVERSATION_ITEM_DELETE = 'conversation.item.delete',
  CONVERSATION_ITEM_TRUNCATE = 'conversation.item.truncate',
  RESPONSE_CREATE = 'response.create',
  RESPONSE_CANCEL = 'response.cancel',
}

export enum RealtimeResponseCommandEnum {
  INIT = 'init',
  SESSION_CREATED = 'session.created',
  SESSION_UPDATED = 'session.updated',
  CONVERSATION_ITEM_CREATED = 'conversation.item.created',
  CONVERSATION_ITEM_DELETED = 'conversation.item.deleted',
  CONVERSATION_ITEM_TRUNCATED = 'conversation.item.truncated',
  RESPONSE_CREATED = 'response.created',
  RESPONSE_DONE = 'response.done',
  RATE_LIMITS_UPDATED = 'rate_limits.updated',
  RESPONSE_OUTPUT_ITEM_ADDED = 'response.output_item.added',
  RESPONSE_OUTPUT_ITEM_DONE = 'response.output_item.done',
  RESPONSE_CONTENT_PART_ADDED = 'response.content_part.added',
  RESPONSE_CONTENT_PART_DONE = 'response.content_part.done',
  RESPONSE_AUDIO_DELTA = 'response.audio.delta',
  RESPONSE_AUDIO_DONE = 'response.audio.done',
  RESPONSE_AUDIO_TRANSCRIPT_DELTA = 'response.audio_transcript.delta',
  RESPONSE_AUDIO_TRANSCRIPT_DONE = 'response.audio_transcript.done',
  RESPONSE_TEXT_DELTA = 'response.text.delta',
  RESPONSE_TEXT_DONE = 'response.text.done',
  RESPONSE_FUNCTION_CALL_ARGUMENTS_DELTA = 'response.function_call_arguments.delta',
  RESPONSE_FUNCTION_CALL_ARGUMENTS_DONE = 'response.function_call_arguments.done',
  INPUT_AUDIO_BUFFER_SPEECH_STARTED = 'input_audio_buffer.speech_started',
  INPUT_AUDIO_BUFFER_SPEECH_STOPPED = 'input_audio_buffer.speech_stopped',
  CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED = 'conversation.item.input_audio_transcription.completed',
  CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_FAILED = 'conversation.item.input_audio_transcription.failed',
  INPUT_AUDIO_BUFFER_COMMITTED = 'input_audio_buffer.committed',
  INPUT_AUDIO_BUFFER_CLEARED = 'input_audio_buffer.cleared',
  ERROR = 'error',
}

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

export type RealtimeResponseCommand<T extends RealtimeRealtimeResponseCommandType | RealtimeResponseCommandEnum>
  = T extends keyof RealtimeResponseTypeMap ? RealtimeResponseTypeMap[T] : never;

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

export type RealtimeRequestCommand<T extends RealtimeRealtimeRequestCommandType | RealtimeRequestCommandEnum>
  = T extends keyof RealtimeRequestTypeMap ? RealtimeRequestTypeMap[T] : never;

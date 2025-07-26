---
sidebar_position: 2
---

# Event Reference

Azure Realtime Audio SDK provides a rich event system for handling various state changes and data streams.

## Session Events

| Event Name | Callback Parameters | Description |
|------------|-------------------|-------------|
| `init` | `(session: Session) => void` | Session initialization completed |
| `session.created` | `(session: Session) => void` | Session creation successful |
| `session.updated` | `(config: SessionConfig) => void` | Session configuration updated |

## Audio Events

| Event Name | Callback Parameters | Description |
|------------|-------------------|-------------|
| `response.audio.delta` | `(data: AudioData) => void` | Received audio data chunk |
| `response.audio.done` | `() => void` | Audio stream ended |
| `response.audio_transcript.delta` | `(data: TranscriptData) => void` | Received audio transcript chunk |
| `response.audio_transcript.done` | `() => void` | Audio transcription completed |
| `input_audio_buffer.speech_started` | `() => void` | Detected user started speaking |
| `input_audio_buffer.speech_stopped` | `() => void` | Detected user stopped speaking |

## Response Events

| Event Name | Callback Parameters | Description |
|------------|-------------------|-------------|
| `response.created` | `() => void` | Response generation started |
| `response.done` | `(response: Response) => void` | Response generation completed |
| `response.text.delta` | `(data: TextData) => void` | Received text content chunk |
| `response.text.done` | `() => void` | Text content completed |

## Error Events

| Event Name | Callback Parameters | Description |
|------------|-------------------|-------------|
| `error` | `(error: Error) => void` | Error occurred |

## Event Data Types

### AudioData

```typescript
interface AudioData {
  delta: string;  // Base64 encoded audio data
  format: string; // Audio format
}
```

### TranscriptData

```typescript
interface TranscriptData {
  delta: string;  // Transcribed text
  isFinal: boolean; // Whether this is the final result
}
```

### TextData

```typescript
interface TextData {
  delta: string;  // Text content
  role: string;   // Role (user/assistant)
}
```

### Response

```typescript
interface Response {
  id: string;           // Response ID
  status: string;       // Response status
  created_at: string;   // Creation time
  audio?: AudioData;    // Audio data
  text?: TextData;      // Text data
}
```

## Usage Examples

### Basic Event Listening

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

// Listen for initialization completion
client.once('init', (session) => {
  console.log('Session established:', session);
});

// Listen for audio data
client.on('response.audio.delta', (data) => {
  console.log('Received audio data:', data.delta);
});

// Listen for text content
client.on('response.text.delta', (data) => {
  console.log('Received text:', data.delta);
});

// Listen for errors
client.on('error', (error) => {
  console.error('Error occurred:', error);
});
```

### Speech Recognition Events

```typescript
// Listen for speech start and stop
client.on('input_audio_buffer.speech_started', () => {
  console.log('Detected user started speaking');
});

client.on('input_audio_buffer.speech_stopped', () => {
  console.log('Detected user stopped speaking');
});

// Listen for speech transcription
client.on('response.audio_transcript.delta', (data) => {
  console.log('Real-time transcript:', data.delta);
  if (data.isFinal) {
    console.log('Final transcription result');
  }
});
```

### Complete Conversation Flow

```typescript
client.once('init', (session) => {
  console.log('Session established');
});

client.on('response.created', () => {
  console.log('Model started generating response');
});

client.on('response.text.delta', (data) => {
  console.log('Model says:', data.delta);
});

client.on('response.audio.delta', (data) => {
  // Handle audio data
  playAudio(data.delta);
});

client.on('response.done', (response) => {
  console.log('Conversation completed');
});

// Error handling
client.on('error', (error) => {
  console.error('Error:', error);
  // Implement reconnection logic
}); 
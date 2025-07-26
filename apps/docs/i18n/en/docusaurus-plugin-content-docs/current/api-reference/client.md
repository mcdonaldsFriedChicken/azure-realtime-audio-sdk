---
sidebar_position: 1
---

# AzureRealTimeAudio Client

`AzureRealTimeAudio` is the core class of the SDK, providing complete functionality for interacting with Azure OpenAI Realtime API.

## Constructor

### AzureRealTimeAudio

```typescript
new AzureRealTimeAudio(options, websocketOptions?, WebSocketImpl?)
```
Creates a new Azure Realtime Audio client instance.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `AzureRealTimeOptions` | ✅ | Client configuration options |
| `websocketOptions` | `WebSocketOptions` | ❌ | WebSocket connection options |
| `WebSocketImpl` | `WebSocketConstructor` | ❌ | WebSocket implementation (required for Node.js environment) |

#### AzureRealTimeOptions

```typescript
interface AzureRealTimeOptions {
  hostName: string;           // Azure OpenAI service hostname
  apiVersion: string;         // API version
  deployment: string;         // Model deployment name
  apiKey: string;            // API key
  sessionConfig?: SessionConfig; // Session configuration (optional)
}
```

#### SessionConfig

```typescript
interface SessionConfig {
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  instructions?: string;
  input_audio_format?: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
  output_audio_format?: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
  turn_detection?: TurnDetection;
  tools?: Tool[];
  tool_choice?: 'auto' | 'none' | 'required' | { type: 'function', name: string };
  temperature?: number;
  max_response_output_tokens?: number;
}
```

## Instance Properties

### status

Get or set the current status of the model.

```typescript
client.status: ModelStatusEnum
```

Possible values:
- `ModelStatusEnum.IDLE` - Model is in idle state
- `ModelStatusEnum.LISTENING` - Model is listening to user input
- `ModelStatusEnum.THINKING` - Model is processing
- `ModelStatusEnum.SPEAKING` - Model is responding

### isInitialized

Check if the client has completed initialization.

```typescript
client.isInitialized: boolean
```

### state

Get the current state of the WebSocket connection.

```typescript
client.state: WebSocketState
```

## Instance Methods

### Event Listening

#### on(event, listener)

Register an event listener.

```typescript
client.on(event: string, listener: Function): void
```

#### once(event, listener)

Register a one-time event listener.

```typescript
client.once(event: string, listener: Function): void
```

#### off(event, listener?)

Remove an event listener.

```typescript
client.off(event: string, listener?: Function): void
```

#### offAll()

Remove all event listeners.

```typescript
client.offAll(): void
```

### Audio Operations

#### appendAudio(base64Audio)

Add audio data to the buffer.

```typescript
client.appendAudio(base64Audio: string): void
```

#### commitAudio()

Submit the audio buffer for processing.

```typescript
client.commitAudio(): void
```

#### clearAudioBuffer()

Clear the audio buffer.

```typescript
client.clearAudioBuffer(): void
```

### Conversation Management

#### createConversationItem(item, previousItemId?)

Create a conversation item.

```typescript
client.createConversationItem(
  item: ConversationItem,
  previousItemId?: string
): void
```

#### deleteItem(itemId)

Delete a conversation item.

```typescript
client.deleteItem(itemId: string): void
```

#### truncateItem(itemId, contentIndex, audioEndMs)

Truncate a conversation item.

```typescript
client.truncateItem(
  itemId: string,
  contentIndex: number,
  audioEndMs: number
): void
```

#### createResponse(responseConfig?)

Create a response.

```typescript
client.createResponse(responseConfig?: ResponseConfig): void
```

#### cancelResponse()

Cancel the current response.

```typescript
client.cancelResponse(): void
```

### Status Management

#### setModelSpeakDone()

Mark the model as finished speaking.

```typescript
client.setModelSpeakDone(): void
```

## Usage Examples

### Basic Usage

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

client.once('init', (session) => {
  console.log('Session established:', session);
});

client.on('response.audio.delta', (audioData) => {
  console.log('Received audio data:', audioData.delta);
});
```

### Node.js Environment

```typescript
import WebSocket from 'ws';

const client = new AzureRealTimeAudio(
  {
    hostName: 'your-resource.openai.azure.com',
    apiVersion: '2024-10-01-preview',
    deployment: 'gpt-4o-realtime-preview',
    apiKey: process.env.AZURE_OPENAI_API_KEY!
  },
  {}, // WebSocket options
  WebSocket // Pass WebSocket implementation
);
```

### Custom Configuration

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    voice: 'shimmer',
    instructions: 'You are a friendly AI assistant. Please answer questions in English.',
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      silence_duration_ms: 800
    }
  }
}); 
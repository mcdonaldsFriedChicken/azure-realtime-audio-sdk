---
sidebar_position: 1
---

# AzureRealTimeAudio Client

`AzureRealTimeAudio` is the core class of the SDK, providing complete interaction capabilities with the Azure OpenAI Realtime API.

## Constructor

### new AzureRealTimeAudio(options, websocketOptions?, WebSocketImpl?)

Creates a new Azure Realtime Audio client instance.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `AzureRealTimeOptions` | ✅ | Client configuration options |
| `websocketOptions` | `WebSocketOptions` | ❌ | WebSocket connection options |
| `WebSocketImpl` | `WebSocketConstructor` | ❌ | WebSocket implementation (required for Node.js) |

#### AzureRealTimeOptions

```typescript
interface AzureRealTimeOptions {
  hostName: string;           // Azure OpenAI service hostname
  apiVersion: string;         // API version
  deployment: string;         // Model deployment name
  apiKey: string;             // API key
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

#### Examples

```typescript
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

// Basic configuration
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

// With custom session configuration
const clientWithConfig = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    voice: 'alloy',
    instructions: 'You are a friendly AI assistant.',
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      silence_duration_ms: 800
    }
  }
});

// Node.js environment
import WebSocket from 'ws';

const nodeClient = new AzureRealTimeAudio(
  {
    hostName: 'your-resource.openai.azure.com',
    apiVersion: '2024-10-01-preview',
    deployment: 'gpt-4o-realtime-preview',
    apiKey: 'your-api-key'
  },
  {}, // WebSocket options
  WebSocket // WebSocket implementation
);
```

## Properties

### status

Get or set the current model status.

```typescript
client.status: ModelStatusEnum
```

**Possible values:**
- `ModelStatusEnum.IDLE` - Idle state
- `ModelStatusEnum.LISTENING` - Listening to user input
- `ModelStatusEnum.THINKING` - Processing and thinking
- `ModelStatusEnum.SPEAKING` - Speaking/responding

**Example:**

```typescript
// Get current status
console.log('Current status:', client.status);

// Set status
client.status = ModelStatusEnum.IDLE;
```

### isInitialized

Check if the client is initialized.

```typescript
client.isInitialized: boolean
```

**Example:**

```typescript
if (client.isInitialized) {
  console.log('Client is ready');
} else {
  console.log('Waiting for initialization...');
}
```

### state

Get WebSocket connection state.

```typescript
client.state: WebSocketState
```

**Possible values:**
- `WebSocketState.CONNECTING` - Connecting
- `WebSocketState.OPEN` - Connection open
- `WebSocketState.CLOSING` - Closing
- `WebSocketState.CLOSED` - Connection closed

## Event Listening Methods

### on(event, listener)

Register an event listener.

```typescript
client.on(event: string, listener: Function): void
```

**Example:**

```typescript
client.on('response.audio.delta', (audioData) => {
  console.log('Received audio data:', audioData.delta);
});
```

### once(event, listener)

Register a one-time event listener (fires only once).

```typescript
client.once(event: string, listener: Function): void
```

**Example:**

```typescript
client.once('init', (session) => {
  console.log('Initialization complete:', session);
});
```

### off(event, listener?)

Remove event listener.

```typescript
client.off(event: string, listener?: Function): void
```

**Example:**

```typescript
// Remove specific listener
const audioHandler = (data) => console.log(data);
client.on('response.audio.delta', audioHandler);
client.off('response.audio.delta', audioHandler);

// Remove all listeners for the event
client.off('response.audio.delta');
```

### offAll()

Remove all event listeners.

```typescript
client.offAll(): void
```

**Example:**

```typescript
// Clean up all listeners
client.offAll();
```

## Audio Operation Methods

### appendAudio(base64Audio)

Add audio data to the input buffer.

```typescript
client.appendAudio(base64Audio: string): void
```

**Parameters:**
- `base64Audio` - base64 encoded audio data

**Example:**

```typescript
// Get audio data from MediaRecorder
mediaRecorder.ondataavailable = (event) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64Audio = (reader.result as string).split(',')[1];
    client.appendAudio(base64Audio);
  };
  reader.readAsDataURL(event.data);
};
```

### commitAudio()

Commit audio buffer for processing.

```typescript
client.commitAudio(): void
```

**Example:**

```typescript
// Commit audio after user stops speaking
function stopRecording() {
  mediaRecorder.stop();
  client.commitAudio(); // Commit audio for AI processing
}
```

### clearAudioBuffer()

Clear the audio input buffer.

```typescript
client.clearAudioBuffer(): void
```

**Example:**

```typescript
// Cancel current recording
client.clearAudioBuffer();
```

## Conversation Management Methods

### createConversationItem(item, previousItemId?)

Create a new conversation item.

```typescript
client.createConversationItem(
  item: ConversationItem, 
  previousItemId?: string
): void
```

**Parameters:**
- `item` - Conversation item object
- `previousItemId` - Optional, ID of the previous item to specify insertion position

**Example:**

```typescript
// Add user message
client.createConversationItem({
  type: 'message',
  role: 'user',
  content: [{
    type: 'input_text',
    text: 'Hello, please introduce yourself.'
  }]
});

// Add function call output
client.createConversationItem({
  type: 'function_call_output',
  call_id: 'call_123',
  output: JSON.stringify({ weather: 'Sunny, 25°C' })
});
```

### deleteItem(itemId)

Delete a specified conversation item.

```typescript
client.deleteItem(itemId: string): void
```

**Example:**

```typescript
client.deleteItem('item_abc123');
```

### truncateItem(itemId, contentIndex, audioEndMs)

Truncate conversation item to specified position.

```typescript
client.truncateItem(
  itemId: string, 
  contentIndex: number, 
  audioEndMs: number
): void
```

**Example:**

```typescript
// Truncate audio to specified time point
client.truncateItem('item_abc123', 0, 5000); // Truncate to 5 seconds
```

## Response Management Methods

### createResponse(responseConfig?)

Create a new response.

```typescript
client.createResponse(responseConfig?: ResponseConfig): void
```

**ResponseConfig:**

```typescript
interface ResponseConfig {
  modalities?: ('text' | 'audio')[];
  instructions?: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  output_audio_format?: 'pcm16' | 'g711_ulaw' | 'g711_alaw';
  tools?: Tool[];
  tool_choice?: 'auto' | 'none' | 'required' | { type: 'function', name: string };
  temperature?: number;
  max_output_tokens?: number;
}
```

**Example:**

```typescript
// Create response with default configuration
client.createResponse();

// Use custom configuration
client.createResponse({
  modalities: ['text', 'audio'],
  voice: 'nova',
  temperature: 0.7,
  instructions: 'Please answer concisely.'
});
```

### cancelResponse()

Cancel the current ongoing response.

```typescript
client.cancelResponse(): void
```

**Example:**

```typescript
// Cancel current response when user interrupts
client.cancelResponse();
```

## State Management Methods

### setModelSpeakDone()

Mark model speech output as complete.

```typescript
client.setModelSpeakDone(): void
```

**Example:**

```typescript
// Call after audio playback completion
audioElement.onended = () => {
  client.setModelSpeakDone();
};
```

## Connection Management Methods

### close()

Close WebSocket connection.

```typescript
client.close(): void
```

**Example:**

```typescript
// Clean up connection on application exit
window.addEventListener('beforeunload', () => {
  client.close();
});
```

## Complete Usage Example

```typescript
import { AzureRealTimeAudio, ModelStatusEnum } from '@azure-realtime-audio/core';

class VoiceAssistant {
  private client: AzureRealTimeAudio;

  constructor() {
    // Initialize client
    this.client = new AzureRealTimeAudio({
      hostName: process.env.AZURE_OPENAI_ENDPOINT!,
      apiVersion: '2024-10-01-preview',
      deployment: 'gpt-4o-realtime-preview',
      apiKey: process.env.AZURE_OPENAI_API_KEY!,
      sessionConfig: {
        voice: 'alloy',
        instructions: 'You are a professional voice assistant.',
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        turn_detection: {
          type: 'server_vad',
          threshold: 0.6,
          silence_duration_ms: 800
        }
      }
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Initialization complete
    this.client.once('init', (session) => {
      console.log('🎉 Assistant ready:', session);
    });

    // State change listeners
    this.client.on('input_audio_buffer.speech_started', () => {
      console.log('🎤 Listening...');
      this.client.status = ModelStatusEnum.LISTENING;
    });

    this.client.on('response.created', () => {
      console.log('🤔 Thinking...');
      this.client.status = ModelStatusEnum.THINKING;
    });

    this.client.on('response.audio.delta', (audioData) => {
      console.log('🗣️ Speaking...');
      this.client.status = ModelStatusEnum.SPEAKING;
      this.playAudio(audioData.delta);
    });

    this.client.on('response.done', () => {
      console.log('✅ Response complete');
      this.client.status = ModelStatusEnum.IDLE;
    });

    // Error handling
    this.client.on('error', (error) => {
      console.error('❌ Error occurred:', error);
      this.handleError(error);
    });
  }

  public async startConversation() {
    // Start conversation logic
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // ... recording logic
  }

  public stopConversation() {
    this.client.clearAudioBuffer();
    this.client.close();
  }

  private playAudio(base64Audio: string) {
    // Audio playback logic
  }

  private handleError(error: any) {
    // Error handling logic
  }
}
```

## Error Handling

The client reports various errors through the `error` event:

```typescript
client.on('error', (error) => {
  switch (error.type) {
    case 'connection_error':
      console.error('Connection error:', error.message);
      // Implement reconnection logic
      break;
    case 'authentication_error':
      console.error('Authentication error:', error.message);
      // Check API key and permissions
      break;
    case 'rate_limit_error':
      console.error('Rate limit error:', error.message);
      // Implement backoff retry
      break;
    default:
      console.error('Unknown error:', error);
  }
});
```

## Best Practices

1. **Always listen to the `error` event** for error handling
2. **Use `once` to listen to the `init` event** to ensure initialization completion
3. **Call `offAll()` promptly** to clean up event listeners
4. **Manage audio buffers properly** to avoid memory leaks
5. **Call `close()` on page unload** to clean up connections

## Related Documentation

- [Events Reference](./events.md) - Detailed event list and parameters
- [Type Definitions](./types.md) - Complete TypeScript type definitions
- [Enum Values](./enums.md) - All enum type descriptions 
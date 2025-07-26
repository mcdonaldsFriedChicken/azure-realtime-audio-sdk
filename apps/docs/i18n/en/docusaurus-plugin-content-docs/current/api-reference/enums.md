---
sidebar_position: 3
---

# Enums

This document lists all enumeration types used in the SDK.

## ModelStatusEnum

Model status enumeration, used to represent the current working state of the model.

```typescript
enum ModelStatusEnum {
  IDLE = 'idle',           // Model is idle
  LISTENING = 'listening', // Listening to user input
  THINKING = 'thinking',   // Processing/thinking
  SPEAKING = 'speaking'    // Speaking/outputting
}
```

### Usage Example

```typescript
import { AzureRealTimeAudio, ModelStatusEnum } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio({
  // ... configuration options
});

// Get current status
console.log(client.status); // ModelStatusEnum.IDLE

// Listen for status changes
client.on('response.created', () => {
  if (client.status === ModelStatusEnum.THINKING) {
    console.log('Model is thinking');
  }
});

// Manually set status
client.status = ModelStatusEnum.IDLE;
```

## WebSocketState

WebSocket connection state enumeration.

```typescript
enum WebSocketState {
  CONNECTING = 0, // Connecting
  OPEN = 1,      // Connection open
  CLOSING = 2,   // Closing
  CLOSED = 3     // Connection closed
}
```

### Usage Example

```typescript
// Check connection state
if (client.state === WebSocketState.OPEN) {
  console.log('WebSocket connection established');
}

// Monitor connection state
client.on('websocket.state_change', (state) => {
  switch (state) {
    case WebSocketState.CONNECTING:
      console.log('Connecting...');
      break;
    case WebSocketState.OPEN:
      console.log('Connection established');
      break;
    case WebSocketState.CLOSING:
      console.log('Closing connection...');
      break;
    case WebSocketState.CLOSED:
      console.log('Connection closed');
      break;
  }
});
```

## AudioFormatEnum

Audio format enumeration, used to specify input and output audio formats.

```typescript
enum AudioFormatEnum {
  PCM16 = 'pcm16',           // PCM 16-bit
  G711_ULAW = 'g711_ulaw',   // G.711 μ-law
  G711_ALAW = 'g711_alaw'    // G.711 A-law
}
```

### Usage Example

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    input_audio_format: AudioFormatEnum.PCM16,
    output_audio_format: AudioFormatEnum.PCM16
  }
});
```

## VoiceEnum

Voice synthesis type enumeration.

```typescript
enum VoiceEnum {
  ALLOY = 'alloy',       // Alloy voice
  ECHO = 'echo',         // Echo voice
  FABLE = 'fable',       // Fable voice
  ONYX = 'onyx',         // Onyx voice
  NOVA = 'nova',         // Nova voice
  SHIMMER = 'shimmer'    // Shimmer voice
}
```

### Usage Example

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    voice: VoiceEnum.SHIMMER
  }
});
```

## ToolChoiceEnum

Tool selection mode enumeration.

```typescript
enum ToolChoiceEnum {
  AUTO = 'auto',           // Automatic selection
  NONE = 'none',          // Don't use tools
  REQUIRED = 'required'    // Must use tools
}
```

### Usage Example

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    tools: [
      {
        type: 'function',
        name: 'get_weather',
        description: 'Get weather information',
        parameters: {
          type: 'object',
          properties: {
            location: { type: 'string', description: 'City name' }
          }
        }
      }
    ],
    tool_choice: ToolChoiceEnum.AUTO
  }
}); 
---
sidebar_position: 1
---

# Voice Assistant Example

This example demonstrates how to build an intelligent voice assistant using Azure Realtime Audio SDK.

```typescript
const voiceAssistant = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    voice: 'alloy',
    instructions: 'You are an intelligent voice assistant. Please answer user questions concisely and friendly.'
  }
});

// Handle audio playback
voiceAssistant.on('response.audio.delta', (data) => {
  // Decode and play base64 audio data
  playAudio(data.delta);
});
```

## Notes

- Use `sessionConfig.voice` to specify the voice type for speech synthesis.
- Use `instructions` to define the assistant's behavior and response style.
- Listen to the `response.audio.delta` event to receive audio stream data.
- Can be integrated with Web Audio API for audio playback. 
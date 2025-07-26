---
sidebar_position: 3
---

# Real-time Translation Example

This example demonstrates how to implement real-time voice translation using Azure Realtime Audio SDK.

```typescript
const translator = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    instructions: 'Please translate user speech to English, return only the translation.',
    voice: 'echo'
  }
});

// Display translation results in real-time
translator.on('response.text.delta', (data) => {
  updateTranslationDisplay(data.delta);
});
```

## Notes

- Specify translation task through `instructions`.
- Listen to the `response.text.delta` event to receive real-time translation text.
- Can be integrated with UI for real-time subtitles or text display. 
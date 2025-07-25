---
sidebar_position: 1
---

# 语音助手示例

本示例展示如何使用 Azure Realtime Audio SDK 构建一个智能语音助手。

```typescript
const voiceAssistant = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    voice: 'alloy',
    instructions: '你是一个智能语音助手，请简洁友好地回答用户问题。'
  }
});

// 处理音频播放
voiceAssistant.on('response.audio.delta', (data) => {
  // 将 base64 音频数据解码并播放
  playAudio(data.delta);
});
```

## 说明

- 通过 `sessionConfig.voice` 指定语音合成的声音类型。
- 通过 `instructions` 指定助手的行为和回复风格。
- 监听 `response.audio.delta` 事件获取音频流数据。
- 可结合 Web Audio API 实现音频播放。 
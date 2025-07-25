---
sidebar_position: 3
---

# 实时翻译示例

本示例展示如何使用 Azure Realtime Audio SDK 实现语音实时翻译。

```typescript
const translator = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    instructions: '请将用户的语音翻译成英文，只返回翻译结果。',
    voice: 'echo'
  }
});

// 实时显示翻译结果
translator.on('response.text.delta', (data) => {
  updateTranslationDisplay(data.delta);
});
```

## 说明

- 通过 `instructions` 指定翻译任务。
- 监听 `response.text.delta` 事件获取实时翻译文本。
- 可结合 UI 实现实时字幕或文本展示。 
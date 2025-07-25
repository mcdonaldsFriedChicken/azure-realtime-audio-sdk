---
sidebar_position: 3
---

# 枚举类型

本文档列出了 SDK 中使用的所有枚举类型。

## ModelStatusEnum

模型状态枚举，用于表示当前模型的工作状态。

```typescript
enum ModelStatusEnum {
  IDLE = 'idle',           // 模型空闲
  LISTENING = 'listening', // 正在聆听用户输入
  THINKING = 'thinking',   // 正在思考/处理
  SPEAKING = 'speaking'    // 正在说话/输出
}
```

### 使用示例

```typescript
import { AzureRealTimeAudio, ModelStatusEnum } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio({
  // ... 配置选项
});

// 获取当前状态
console.log(client.status); // ModelStatusEnum.IDLE

// 监听状态变化
client.on('response.created', () => {
  if (client.status === ModelStatusEnum.THINKING) {
    console.log('模型正在思考');
  }
});

// 手动设置状态
client.status = ModelStatusEnum.IDLE;
```

## WebSocketState

WebSocket 连接状态枚举。

```typescript
enum WebSocketState {
  CONNECTING = 0, // 正在连接
  OPEN = 1,      // 连接已打开
  CLOSING = 2,   // 正在关闭
  CLOSED = 3     // 连接已关闭
}
```

### 使用示例

```typescript
// 检查连接状态
if (client.state === WebSocketState.OPEN) {
  console.log('WebSocket 连接已建立');
}

// 监听连接状态
client.on('websocket.state_change', (state) => {
  switch (state) {
    case WebSocketState.CONNECTING:
      console.log('正在连接...');
      break;
    case WebSocketState.OPEN:
      console.log('连接已建立');
      break;
    case WebSocketState.CLOSING:
      console.log('正在关闭连接...');
      break;
    case WebSocketState.CLOSED:
      console.log('连接已关闭');
      break;
  }
});
```

## AudioFormatEnum

音频格式枚举，用于指定输入和输出音频的格式。

```typescript
enum AudioFormatEnum {
  PCM16 = 'pcm16',           // PCM 16位
  G711_ULAW = 'g711_ulaw',   // G.711 μ-law
  G711_ALAW = 'g711_alaw'    // G.711 A-law
}
```

### 使用示例

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

语音合成声音类型枚举。

```typescript
enum VoiceEnum {
  ALLOY = 'alloy',       // Alloy 声音
  ECHO = 'echo',         // Echo 声音
  FABLE = 'fable',       // Fable 声音
  ONYX = 'onyx',         // Onyx 声音
  NOVA = 'nova',         // Nova 声音
  SHIMMER = 'shimmer'    // Shimmer 声音
}
```

### 使用示例

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

工具选择模式枚举。

```typescript
enum ToolChoiceEnum {
  AUTO = 'auto',           // 自动选择
  NONE = 'none',          // 不使用工具
  REQUIRED = 'required'    // 必须使用工具
}
```

### 使用示例

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
        description: '获取天气信息',
        parameters: {
          type: 'object',
          properties: {
            location: { type: 'string', description: '城市名称' }
          }
        }
      }
    ],
    tool_choice: ToolChoiceEnum.AUTO
  }
});
``` 
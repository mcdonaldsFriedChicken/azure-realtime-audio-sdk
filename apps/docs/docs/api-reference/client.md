---
sidebar_position: 1
---

# AzureRealTimeAudio 客户端

`AzureRealTimeAudio` 是 SDK 的核心类，提供了与 Azure OpenAI Realtime API 交互的完整功能。

## 构造函数

### new AzureRealTimeAudio(options, websocketOptions?, WebSocketImpl?)

创建一个新的 Azure Realtime Audio 客户端实例。

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `options` | `AzureRealTimeOptions` | ✅ | 客户端配置选项 |
| `websocketOptions` | `WebSocketOptions` | ❌ | WebSocket 连接选项 |
| `WebSocketImpl` | `WebSocketConstructor` | ❌ | WebSocket 实现（Node.js 环境必需） |

#### AzureRealTimeOptions

```typescript
interface AzureRealTimeOptions {
  hostName: string;           // Azure OpenAI 服务域名
  apiVersion: string;         // API 版本
  deployment: string;         // 模型部署名称
  apiKey: string;            // API 密钥
  sessionConfig?: SessionConfig; // 会话配置（可选）
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

## 实例属性

### status

获取或设置模型的当前状态。

```typescript
client.status: ModelStatusEnum
```

可能的值：
- `ModelStatusEnum.IDLE` - 模型空闲状态
- `ModelStatusEnum.LISTENING` - 模型正在聆听用户输入
- `ModelStatusEnum.THINKING` - 模型正在思考处理
- `ModelStatusEnum.SPEAKING` - 模型正在回答输出

### isInitialized

检查客户端是否已完成初始化。

```typescript
client.isInitialized: boolean
```

### state

获取 WebSocket 连接的当前状态。

```typescript
client.state: WebSocketState
```

## 实例方法

### 事件监听

#### on(event, listener)

注册事件监听器。

```typescript
client.on(event: string, listener: Function): void
```

#### once(event, listener)

注册一次性事件监听器。

```typescript
client.once(event: string, listener: Function): void
```

#### off(event, listener?)

移除事件监听器。

```typescript
client.off(event: string, listener?: Function): void
```

#### offAll()

移除所有事件监听器。

```typescript
client.offAll(): void
```

### 音频操作

#### appendAudio(base64Audio)

添加音频数据到缓冲区。

```typescript
client.appendAudio(base64Audio: string): void
```

#### commitAudio()

提交音频缓冲区进行处理。

```typescript
client.commitAudio(): void
```

#### clearAudioBuffer()

清空音频缓冲区。

```typescript
client.clearAudioBuffer(): void
```

### 对话管理

#### createConversationItem(item, previousItemId?)

创建对话项。

```typescript
client.createConversationItem(
  item: ConversationItem,
  previousItemId?: string
): void
```

#### deleteItem(itemId)

删除对话项。

```typescript
client.deleteItem(itemId: string): void
```

#### truncateItem(itemId, contentIndex, audioEndMs)

截断对话项。

```typescript
client.truncateItem(
  itemId: string,
  contentIndex: number,
  audioEndMs: number
): void
```

#### createResponse(responseConfig?)

创建响应。

```typescript
client.createResponse(responseConfig?: ResponseConfig): void
```

#### cancelResponse()

取消当前响应。

```typescript
client.cancelResponse(): void
```

### 状态管理

#### setModelSpeakDone()

标记模型完成说话。

```typescript
client.setModelSpeakDone(): void
```

## 使用示例

### 基础用法

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

client.once('init', (session) => {
  console.log('会话已建立:', session);
});

client.on('response.audio.delta', (audioData) => {
  console.log('收到音频数据:', audioData.delta);
});
```

### Node.js 环境

```typescript
import WebSocket from 'ws';

const client = new AzureRealTimeAudio(
  {
    hostName: 'your-resource.openai.azure.com',
    apiVersion: '2024-10-01-preview',
    deployment: 'gpt-4o-realtime-preview',
    apiKey: process.env.AZURE_OPENAI_API_KEY!
  },
  {}, // WebSocket 选项
  WebSocket // 传入 WebSocket 实现
);
```

### 自定义配置

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key',
  sessionConfig: {
    voice: 'shimmer',
    instructions: '你是一个友好的AI助手，请用中文回答问题。',
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      silence_duration_ms: 800
    }
  }
});
``` 
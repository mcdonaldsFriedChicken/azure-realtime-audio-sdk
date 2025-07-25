---
sidebar_position: 2
---

# 事件参考

Azure Realtime Audio SDK 提供了丰富的事件系统，用于处理各种状态变化和数据流。

## 会话事件

| 事件名 | 回调参数 | 描述 |
|--------|----------|------|
| `init` | `(session: Session) => void` | 会话初始化完成 |
| `session.created` | `(session: Session) => void` | 会话创建成功 |
| `session.updated` | `(config: SessionConfig) => void` | 会话配置更新 |

## 音频事件

| 事件名 | 回调参数 | 描述 |
|--------|----------|------|
| `response.audio.delta` | `(data: AudioData) => void` | 收到音频数据块 |
| `response.audio.done` | `() => void` | 音频流结束 |
| `response.audio_transcript.delta` | `(data: TranscriptData) => void` | 收到音频转录块 |
| `response.audio_transcript.done` | `() => void` | 音频转录完成 |
| `input_audio_buffer.speech_started` | `() => void` | 检测到用户开始说话 |
| `input_audio_buffer.speech_stopped` | `() => void` | 检测到用户停止说话 |

## 响应事件

| 事件名 | 回调参数 | 描述 |
|--------|----------|------|
| `response.created` | `() => void` | 响应生成开始 |
| `response.done` | `(response: Response) => void` | 响应生成完成 |
| `response.text.delta` | `(data: TextData) => void` | 收到文本内容块 |
| `response.text.done` | `() => void` | 文本内容完成 |

## 错误事件

| 事件名 | 回调参数 | 描述 |
|--------|----------|------|
| `error` | `(error: Error) => void` | 发生错误 |

## 事件数据类型

### AudioData

```typescript
interface AudioData {
  delta: string;  // base64 编码的音频数据
  format: string; // 音频格式
}
```

### TranscriptData

```typescript
interface TranscriptData {
  delta: string;  // 转录文本
  isFinal: boolean; // 是否为最终结果
}
```

### TextData

```typescript
interface TextData {
  delta: string;  // 文本内容
  role: string;   // 角色（user/assistant）
}
```

### Response

```typescript
interface Response {
  id: string;           // 响应ID
  status: string;       // 响应状态
  created_at: string;   // 创建时间
  audio?: AudioData;    // 音频数据
  text?: TextData;      // 文本数据
}
```

## 使用示例

### 基础事件监听

```typescript
const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

// 监听初始化完成
client.once('init', (session) => {
  console.log('会话已建立:', session);
});

// 监听音频数据
client.on('response.audio.delta', (data) => {
  console.log('收到音频数据:', data.delta);
});

// 监听文本内容
client.on('response.text.delta', (data) => {
  console.log('收到文本:', data.delta);
});

// 监听错误
client.on('error', (error) => {
  console.error('发生错误:', error);
});
```

### 语音识别事件

```typescript
// 监听语音开始和结束
client.on('input_audio_buffer.speech_started', () => {
  console.log('检测到用户开始说话');
});

client.on('input_audio_buffer.speech_stopped', () => {
  console.log('检测到用户停止说话');
});

// 监听语音转录
client.on('response.audio_transcript.delta', (data) => {
  console.log('实时转录:', data.delta);
  if (data.isFinal) {
    console.log('最终转录结果');
  }
});
```

### 完整对话流程

```typescript
client.once('init', (session) => {
  console.log('会话已建立');
});

client.on('response.created', () => {
  console.log('模型开始生成响应');
});

client.on('response.text.delta', (data) => {
  console.log('模型说:', data.delta);
});

client.on('response.audio.delta', (data) => {
  // 处理音频数据
  playAudio(data.delta);
});

client.on('response.done', (response) => {
  console.log('对话完成');
});

// 错误处理
client.on('error', (error) => {
  console.error('错误:', error);
  // 实现重连逻辑
});
``` 
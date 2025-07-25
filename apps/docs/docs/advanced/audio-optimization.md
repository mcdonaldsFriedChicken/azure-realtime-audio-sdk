---
sidbar_position: 2
---

# 音频质量优化

合理配置音频参数和前端录音设置，可以显著提升语音识别和合成的效果。

## 推荐参数

```typescript
const sessionConfig = {
  input_audio_format: 'pcm16',
  turn_detection: {
    type: 'server_vad',
    threshold: 0.6, // 调整灵敏度
    silence_duration_ms: 800 // 调整静音检测时间
  }
};
```

## 录音建议

- 使用 16kHz 采样率、单声道
- 启用回声消除、噪声抑制
- 合理分片（如每 100ms 发送一次数据）

## 示例：浏览器录音配置

```typescript
const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    sampleRate: 16000,
    channelCount: 1,
    echoCancellation: true,
    noiseSuppression: true
  }
});
``` 
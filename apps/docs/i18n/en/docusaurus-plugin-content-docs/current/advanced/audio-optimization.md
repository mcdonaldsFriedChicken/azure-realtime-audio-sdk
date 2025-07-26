---
sidebar_position: 2
---

# Audio Quality Optimization

Properly configuring audio parameters and frontend recording settings can significantly improve speech recognition and synthesis results.

## Recommended Parameters

```typescript
const sessionConfig = {
  input_audio_format: 'pcm16',
  turn_detection: {
    type: 'server_vad',
    threshold: 0.6, // Adjust sensitivity
    silence_duration_ms: 800 // Adjust silence detection duration
  }
};
```

## Recording Recommendations

- Use 16kHz sample rate, mono channel
- Enable echo cancellation and noise suppression
- Appropriate chunking (e.g., send data every 100ms)

## Example: Browser Recording Configuration

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
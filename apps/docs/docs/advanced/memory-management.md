---
sidebar_position: 3
---

# 内存管理

及时清理事件监听器和关闭连接，有助于防止内存泄漏，提升应用稳定性。

## 事件监听清理

```typescript
const cleanup = () => {
  client.offAll();
  client.close();
};

// 页面卸载时清理
window.addEventListener('beforeunload', cleanup);
```

## 资源释放建议

- 停止录音时关闭音频流
- 关闭 WebSocket 连接
- 移除所有事件监听器
- 释放 AudioContext 等前端资源

## 示例：完整清理

```typescript
function cleanupAll() {
  client.offAll();
  client.close();
  if (audioContext) {
    audioContext.close();
  }
}

window.addEventListener('beforeunload', cleanupAll);
``` 
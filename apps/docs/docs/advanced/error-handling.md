---
sidebar_position: 1
---

# 错误处理

在使用 Azure Realtime Audio SDK 过程中，建议实现健壮的错误处理机制，提升用户体验和系统稳定性。

## 事件监听方式

SDK 提供了 `error` 事件用于捕获运行时错误：

```typescript
client.on('error', (error) => {
  console.error('连接错误:', error);
  // 实现重连逻辑
  setTimeout(() => {
    // 重新创建客户端连接
  }, 5000);
});
```

## 常见错误类型

- 连接错误（如网络断开、服务器不可达）
- 认证失败（API Key 错误或权限不足）
- 速率限制（请求过于频繁）
- 音频权限问题（浏览器未授权麦克风）

## 错误恢复建议

- 自动重连机制
- 明确的错误提示和 UI 反馈
- 记录错误日志，便于排查
- 对于不可恢复的错误，建议引导用户刷新页面或重新登录

## 示例：自动重连

```typescript
client.on('error', (error) => {
  if (error.type === 'connection_error') {
    // 断线重连
    setTimeout(() => {
      // 重新初始化 client
    }, 3000);
  }
});
``` 
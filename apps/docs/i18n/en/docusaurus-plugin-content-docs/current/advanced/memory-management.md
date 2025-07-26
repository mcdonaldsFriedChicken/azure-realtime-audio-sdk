---
sidebar_position: 3
---

# Memory Management

Timely cleanup of event listeners and closing connections helps prevent memory leaks and improves application stability.

## Event Listener Cleanup

```typescript
const cleanup = () => {
  client.offAll();
  client.close();
};

// Clean up on page unload
window.addEventListener('beforeunload', cleanup);
```

## Resource Release Recommendations

- Close audio stream when stopping recording
- Close WebSocket connection
- Remove all event listeners
- Release frontend resources like AudioContext

## Example: Complete Cleanup

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
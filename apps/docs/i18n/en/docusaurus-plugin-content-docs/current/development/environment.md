---
sidbar_position: 1
---

# 开发环境配置

本页介绍如何在 Node.js 和浏览器环境下配置 Azure Realtime Audio SDK。

## Node.js 环境

在 Node.js 环境中，需要额外安装 WebSocket 实现：

```bash
npm install ws
```

并在创建客户端时传入 WebSocket 实现：

```typescript
import WebSocket from 'ws';
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

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

## 环境变量

推荐使用环境变量管理敏感信息：

```bash
# .env 文件
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

## 浏览器环境

- 需在 HTTPS 环境下运行（本地开发可用 localhost）
- 需用户授权麦克风权限
- 推荐使用现代浏览器（Chrome、Firefox、Safari、Edge）

## 验证安装

```typescript
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

client.once('init', (session) => {
  console.log('会话已建立:', session);
});
``` 
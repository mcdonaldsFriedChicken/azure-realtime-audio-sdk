---
sidebar_position: 1
---

# 安装指南

## 环境要求

- Node.js >= 18.0
- npm、yarn 或 pnpm 包管理器

## 安装步骤

你可以使用任何主流的包管理器来安装 Azure Realtime Audio SDK：

```bash
# 使用 npm
npm install @azure-realtime-audio/core

# 使用 pnpm
pnpm add @azure-realtime-audio/core

# 使用 yarn
yarn add @azure-realtime-audio/core
```

## Node.js 环境配置

如果你在 Node.js 环境中使用本 SDK，你需要额外安装 WebSocket 实现：

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

## 环境变量配置

推荐使用环境变量来管理敏感配置信息：

```bash
# .env 文件
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

## 验证安装

安装完成后，你可以使用以下代码验证安装是否成功：

```typescript
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

// 创建客户端实例
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
```

## 下一步

- [快速开始指南](./quick-start.md) - 构建你的第一个语音应用
- [API 参考](../api-reference/client.md) - 了解完整的 API 功能
- [使用示例](../guides/voice-assistant.md) - 探索常见使用场景 
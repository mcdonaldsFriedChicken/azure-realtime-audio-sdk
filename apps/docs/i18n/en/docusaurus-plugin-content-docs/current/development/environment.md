---
sidebar_position: 1
---

# Development Environment Setup

This page explains how to configure Azure Realtime Audio SDK in Node.js and browser environments.

## Node.js Environment

In Node.js environment, you need to install a WebSocket implementation:

```bash
npm install ws
```

And pass the WebSocket implementation when creating the client:

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
  {}, // WebSocket options
  WebSocket // Pass WebSocket implementation
);
```

## Environment Variables

It's recommended to manage sensitive information using environment variables:

```bash
# .env file
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

## Browser Environment

- Must run in HTTPS environment (localhost is fine for local development)
- Requires user authorization for microphone access
- Recommended to use modern browsers (Chrome, Firefox, Safari, Edge)

## Verify Installation

```typescript
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: 'your-api-key'
});

client.once('init', (session) => {
  console.log('Session established:', session);
});
``` 
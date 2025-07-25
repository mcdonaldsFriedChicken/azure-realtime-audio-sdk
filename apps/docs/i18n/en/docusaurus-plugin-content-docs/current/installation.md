---
sidebar_position: 2
---

# Installation

This guide will help you install and configure Azure Realtime Audio SDK.

## System Requirements

Before getting started, ensure your environment meets the following requirements:

### Node.js Environment
- **Node.js**: 18.0 or higher
- **npm**: 8.0 or higher / **pnpm**: 7.0 or higher / **yarn**: 1.22 or higher

### Azure OpenAI Service
- Azure OpenAI resource instance
- GPT-4o Realtime Preview model deployment
- API key and endpoint information

### Browser Support
- Chrome 80+
- Firefox 72+
- Safari 13.1+
- Edge 80+

## 📦 Install SDK

Choose your preferred package manager to install Azure Realtime Audio SDK:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="npm" label="npm" default>

```bash
npm install @azure-realtime-audio/core
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @azure-realtime-audio/core
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @azure-realtime-audio/core
```

</TabItem>
</Tabs>

## 🔧 Configure Azure OpenAI

### 1. Create Azure OpenAI Resource

If you don't have an Azure OpenAI resource yet, follow these steps:

1. Sign in to [Azure Portal](https://portal.azure.com/)
2. Click "Create a resource"
3. Search and select "Azure OpenAI"
4. Fill in the required information and create the resource
5. Wait for deployment to complete

### 2. Deploy GPT-4o Realtime Preview Model

1. In your Azure OpenAI resource, navigate to "Model deployments"
2. Click "Create new deployment"
3. Select the `gpt-4o-realtime-preview` model
4. Enter deployment name (e.g., `gpt-4o-realtime`)
5. Complete deployment

### 3. Get Configuration Information

After deployment, you need to obtain the following information:

- **Endpoint**: Your Azure OpenAI resource endpoint
- **API Key**: Key for authentication
- **Deployment Name**: The model deployment name you created
- **API Version**: Recommended to use `2024-10-01-preview`

## 🌍 Environment Variables Configuration

For secure management of your Azure OpenAI credentials, we recommend using environment variables:

### .env File Configuration

Create a `.env` file in your project root:

```bash
# .env
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

:::warning Security Reminder
Make sure to add the `.env` file to `.gitignore` to avoid committing sensitive information to version control.
:::

### Load Environment Variables

If you're using Node.js, install and configure `dotenv`:

<Tabs>
<TabItem value="npm" label="npm" default>

```bash
npm install dotenv
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add dotenv
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add dotenv
```

</TabItem>
</Tabs>

Load environment variables at the application entry:

```javascript
// At the very top of your application
require('dotenv').config();
// Or using ES6 syntax
import 'dotenv/config';
```

## 📱 Environment-Specific Configuration

### Browser Environment

When using in browsers, you may need to configure build tools to handle environment variables:

#### Webpack Configuration

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // ... other configuration
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AZURE_OPENAI_API_KEY': JSON.stringify(process.env.AZURE_OPENAI_API_KEY),
      'process.env.AZURE_OPENAI_ENDPOINT': JSON.stringify(process.env.AZURE_OPENAI_ENDPOINT),
      // ... other environment variables
    }),
  ],
};
```

#### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.AZURE_OPENAI_API_KEY': JSON.stringify(process.env.AZURE_OPENAI_API_KEY),
    'process.env.AZURE_OPENAI_ENDPOINT': JSON.stringify(process.env.AZURE_OPENAI_ENDPOINT),
    // ... other environment variables
  },
});
```

### Node.js Environment

In Node.js environment, you also need to install WebSocket implementation:

<Tabs>
<TabItem value="npm" label="npm" default>

```bash
npm install ws
npm install @types/ws --save-dev  # If using TypeScript
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add ws
pnpm add @types/ws -D  # If using TypeScript
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add ws
yarn add @types/ws --dev  # If using TypeScript
```

</TabItem>
</Tabs>

## ✅ Verify Installation

Create a simple test file to verify the installation is successful:

```typescript
// test.ts
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio({
  hostName: process.env.AZURE_OPENAI_ENDPOINT!,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION!,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT!,
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
});

client.once('init', (session) => {
  console.log('✅ Azure Realtime Audio SDK installation successful!');
  console.log('Session info:', session);
});

client.on('error', (error) => {
  console.error('❌ Connection failed:', error);
});
```

Run the test:

```bash
npx tsx test.ts  # If using TypeScript
# or
node test.js     # If using JavaScript
```

## 🔧 TypeScript Configuration

If you're using TypeScript, ensure your `tsconfig.json` includes the following configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["DOM", "DOM.Iterable", "ES6"]
  }
}
```

## 🚀 Next Steps

After installation, you can:

1. [Check the Quick Start Guide](./quick-start.md) - Get started in 5 minutes
2. [Browse Example Code](./examples/voice-assistant.md) - Learn practical applications
3. [View API Documentation](/docs/api-reference/client) - Understand detailed API usage

## ❓ FAQ

### Q: What to do if encountering network issues during installation?

A: If you're in mainland China, you can use the following mirror sources:

```bash
# Use Taobao mirror
npm config set registry https://registry.npmmirror.com/
# Or use cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com/
cnpm install @azure-realtime-audio/core
```

### Q: Encountering WebSocket-related errors in Node.js?

A: Make sure you have installed the `ws` package and pass the WebSocket implementation when creating the client:

```typescript
import WebSocket from 'ws';
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

const client = new AzureRealTimeAudio(
  {
    // ... configuration options
  },
  {}, // WebSocket options
  WebSocket // WebSocket implementation
);
```

### Q: How to get Azure OpenAI access?

A: Azure OpenAI currently requires application for access. Please visit the [Azure OpenAI application page](https://azure.microsoft.com/products/ai-services/openai-service) to submit your application. 
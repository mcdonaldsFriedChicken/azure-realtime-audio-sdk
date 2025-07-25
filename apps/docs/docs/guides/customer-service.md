---
sidebar_position: 2
---

# 客服机器人示例

本示例展示如何使用 Azure Realtime Audio SDK 构建一个客服机器人，并支持工具调用。

```typescript
const customerService = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    instructions: '你是一个专业的客服代表，请耐心解答客户问题。',
    tools: [
      {
        type: 'function',
        name: 'query_order',
        description: '查询订单状态',
        parameters: {
          type: 'object',
          properties: {
            orderId: { type: 'string', description: '订单号' }
          }
        }
      }
    ]
  }
});

// 处理工具调用
customerService.on('response.function_call_arguments.done', async (data) => {
  if (data.name === 'query_order') {
    const args = JSON.parse(data.arguments);
    const orderInfo = await queryOrderById(args.orderId);

    // 返回工具调用结果
    customerService.createConversationItem({
      type: 'function_call_output',
      call_id: data.call_id,
      output: JSON.stringify(orderInfo)
    });
  }
});
```

## 说明

- 通过 `tools` 配置支持 Function Calling。
- 监听 `response.function_call_arguments.done` 事件处理工具调用。
- 可结合实际业务系统返回查询结果。 
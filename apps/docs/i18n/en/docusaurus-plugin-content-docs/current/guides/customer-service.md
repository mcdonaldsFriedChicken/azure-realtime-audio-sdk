---
sidebar_position: 2
---

# Customer Service Bot Example

This example demonstrates how to build a customer service bot using Azure Realtime Audio SDK with function calling support.

```typescript
const customerService = new AzureRealTimeAudio({
  hostName: 'your-resource.openai.azure.com',
  apiVersion: '2024-10-01-preview',
  deployment: 'gpt-4o-realtime-preview',
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    instructions: 'You are a professional customer service representative. Please answer customer questions patiently.',
    tools: [
      {
        type: 'function',
        name: 'query_order',
        description: 'Query order status',
        parameters: {
          type: 'object',
          properties: {
            orderId: { type: 'string', description: 'Order ID' }
          }
        }
      }
    ]
  }
});

// Handle function calls
customerService.on('response.function_call_arguments.done', async (data) => {
  if (data.name === 'query_order') {
    const args = JSON.parse(data.arguments);
    const orderInfo = await queryOrderById(args.orderId);

    // Return function call result
    customerService.createConversationItem({
      type: 'function_call_output',
      call_id: data.call_id,
      output: JSON.stringify(orderInfo)
    });
  }
});
```

## Notes

- Configure function calling support through `tools`.
- Listen to the `response.function_call_arguments.done` event to handle function calls.
- Can be integrated with actual business systems to return query results. 
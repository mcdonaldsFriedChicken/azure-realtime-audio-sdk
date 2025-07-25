import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 
 The sidebars can be generated from the filesystem, or explicitly defined here.
 
 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: '介绍',
      link: {
        type: 'doc',
        id: 'intro/index',
      },
      items: [
        'intro/index',
      ],
    },
    {
      type: 'category',
      label: '入门指南',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'API参考',
      items: [
        'api-reference/client',
        'api-reference/events',
        'api-reference/enums',
      ],
    },
    {
      type: 'category',
      label: '使用指南',
      items: [
        'guides/voice-assistant',
        'guides/customer-service',
        'guides/translation',
      ],
    },
    {
      type: 'category',
      label: '高级主题',
      items: [
        'advanced/error-handling',
        'advanced/audio-optimization',
        'advanced/memory-management',
      ],
    },
    {
      type: 'category',
      label: '开发',
      items: [
        'development/environment',
        'development/contributing',
      ],
    },
  ],
};

export default sidebars;

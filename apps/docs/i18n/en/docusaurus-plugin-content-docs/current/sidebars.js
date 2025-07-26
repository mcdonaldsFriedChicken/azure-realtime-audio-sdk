const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/client',
        'api-reference/events',
        'api-reference/enums',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/voice-assistant',
        'guides/customer-service',
        'guides/translation',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/error-handling',
        'advanced/audio-optimization',
        'advanced/memory-management',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/environment',
        'development/contributing',
      ],
    },
  ],
};

module.exports = sidebars; 
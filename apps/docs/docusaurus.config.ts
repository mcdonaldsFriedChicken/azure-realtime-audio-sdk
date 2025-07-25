import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Azure Realtime Audio SDK',
  tagline: '基于 Azure OpenAI Realtime API 的 TypeScript/JavaScript SDK，支持实时语音对话',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://jsonlee12138.github.io',
  baseUrl: '/azure-realtime-audio-sdk/',

  // GitHub pages deployment config
  organizationName: 'JsonLee12138',
  projectName: 'azure-realtime-audio-sdk',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 国际化配置
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/JsonLee12138/azure-realtime-audio-sdk/tree/main/apps/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/JsonLee12138/azure-realtime-audio-sdk/tree/main/apps/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 图片
    image: 'img/docusaurus-social-card.jpg',

    // 导航栏配置
    navbar: {
      title: 'Azure Realtime Audio SDK',
      logo: {
        alt: 'Azure Realtime Audio SDK Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs', // 修正为实际 sidebar id
          position: 'left',
          label: '文档',
        },
        {
          type: 'doc',
          docId: 'api-reference/client',
          position: 'left',
          label: 'API',
        },
        { to: '/blog', label: '博客', position: 'left' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/JsonLee12138/azure-realtime-audio-sdk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    // 页脚配置
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'API参考',
              to: '/docs/api-reference/client',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/666U6JTCQY',
            },
            {
              label: 'QQ频道',
              href: 'https://pd.qq.com/s/fjwy3eo20?b=9',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/JsonLee12138/azure-realtime-audio-sdk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Azure Realtime Audio SDK. Built with Docusaurus.`,
    },

    // Algolia DocSearch 占位配置
    // 请前往 https://docsearch.algolia.com/ 申请 appId、apiKey、indexName
    algolia: {
      appId: 'YOUR_APP_ID', // 替换为你的 appId
      apiKey: 'YOUR_SEARCH_API_KEY', // 替换为你的 search-only apiKey
      indexName: 'YOUR_INDEX_NAME', // 替换为你的索引名
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },

    // 代码高亮主题
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

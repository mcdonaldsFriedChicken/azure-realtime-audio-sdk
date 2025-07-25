import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '实时语音交互',
    description: (
      <>
        支持流式音频输入输出，提供低延迟的对话体验。支持 PCM16、G.711 μ-law、G.711 A-law 等多种音频格式。
      </>
    ),
    icon: '🎤',
  },
  {
    title: 'WebSocket 通信',
    description: (
      <>
        基于 WebSocket 的实时双向通信，支持浏览器和 Node.js 环境。智能的对话状态管理，自动处理连接维护。
      </>
    ),
    icon: '🌐',
  },
  {
    title: '工具调用支持',
    description: (
      <>
        支持 Function Calling，可扩展 AI 能力。内置 Whisper 模型支持语音转录，完整的类型定义和文档。
      </>
    ),
    icon: '🛠️',
  },
  {
    title: 'TypeScript 原生支持',
    description: (
      <>
        完整的 TypeScript 类型定义和 JSDoc 文档。智能提示和类型安全，减少运行时错误。
      </>
    ),
    icon: '🎯',
  },
  {
    title: '状态管理',
    description: (
      <>
        智能的对话状态管理（空闲、聆听、思考、回答）。丰富的事件系统，方便集成和扩展。
      </>
    ),
    icon: '🔄',
  },
  {
    title: '跨平台支持',
    description: (
      <>
        支持浏览器和 Node.js 环境。提供完整的示例代码和最佳实践指南。
      </>
    ),
    icon: '🌍',
  },
];

function Feature({title, description, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

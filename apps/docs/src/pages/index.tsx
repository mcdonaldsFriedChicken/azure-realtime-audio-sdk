import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start">
            快速开始 - 5分钟 ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className={styles.gettingStarted}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <Heading as="h2" className={styles.gettingStartedTitle}>
                  开始使用
                </Heading>
                  <CodeBlock language="ts">
{`npm install @azure-realtime-audio/core

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

client.on('response.audio.delta', (audioData) => {
  console.log('收到音频数据:', audioData.delta);
});`}
                  </CodeBlock>
                <div className={styles.gettingStartedLinks}>
                  <Link
                    className="button button--primary button--lg"
                    to="/docs/getting-started/installation">
                    安装指南
                  </Link>
                  <Link
                    className="button button--secondary button--lg"
                    to="/docs/api-reference/client">
                    API 文档
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

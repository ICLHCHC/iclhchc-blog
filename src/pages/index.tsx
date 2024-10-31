import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Hero from '../components/landing/Hero';
import ToyHero from '../components/ToyComponents/ToyHero';

function HomepageHeader() {
  // useDocusaurusContext() 是一个 React Hook，用于访问 Docusaurus 提供的上下文信息，包含网站的各种配置和状态。
  const { siteConfig } = useDocusaurusContext();
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
            to="/docs/intro">
            Docusaurus 教程 - 5分钟 ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`你好${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">

      {/* <HomepageHeader /> */}

      <main>
        <Hero/>
        {/* <HomepageFeatures /> */}

        {/* <ToyHero
          title="欢迎来到我的网站"
          description="这是一个简单的 React Hero 组件示例。"
          buttonText="了解更多"
        /> */}

      </main>
    </Layout>
  );
}

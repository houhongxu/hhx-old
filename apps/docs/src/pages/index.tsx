import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import styles from './index.module.css'

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{ backgroundColor: '#282C34' }}>
      <div className='container'>
        <h1 className='hero__title' style={{ color: '#61DAFB' }}>
          欢迎
        </h1>
        <p className='hero__subtitle'>随便看看</p>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            style={{ backgroundColor: '#61DAFB', border: 'none', borderRadius: '0' }}
            to='docs/笔记-react/intro/架构'
          >
            先开始学TMD五分钟⏱️
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout title='Hello' description='Description will go into a meta tag in <head />'>
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  )
}

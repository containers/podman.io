import React from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// import styles from './index.module.css';
/*
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}></div>
      </div>
    </header>
  );
}
*/
export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <main>
        <section className="my-12">
          <div className="">
            <h1 className="text-4xl font-extrabold lg:text-5xl">This is an h1 heading</h1>
            <p className="text-lg lg:text-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold lg:text-4xl">This is an h2 heading</h2>
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet minus voluptates obcaecati dolorum
              dignissimos! Id voluptatum perferendis illum minus. Saepe.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold lg:text-3xl">This is an h3 heading</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio eius maiores reprehenderit molestias
              tempora corrupti tempore, doloribus, dolorum architecto laborum similique eaque numquam quos. Vitae
              asperiores explicabo quo quam dolores unde, reiciendis odit pariatur ab libero alias veniam magni esse
              eius excepturi rerum cupiditate debitis aliquid, dignissimos officiis! Temporibus, sapiente.
            </p>
          </div>
          <div>
            <h4>This is an h4 heading</h4>
            <ul>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, modi corporis? Voluptatem iure dolorum
                cumque vero, fuga aperiam neque. Dicta!
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eaque quae. Nisi doloremque consectetur
                quas. Illum distinctio ullam autem iusto.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam eveniet alias fuga excepturi
                accusamus voluptate voluptates minus quisquam aliquid!
              </li>
            </ul>
          </div>
          <div>
            <h5>Code Block</h5>
            <code>const number = 37;</code>
          </div>
        </section>
      </main>
    </Layout>
  );
}

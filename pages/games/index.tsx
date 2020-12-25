import * as React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import {DealSomeCards} from '@components/Cards';

export default function Game() {
  const postData = {
    title: 'My Cool new Game!',
    contentHtml: '<span>Hi ma!</span>',
    date: new global.Date().toISOString(),
  };
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        <DealSomeCards />
      </article>
    </Layout>
  );
}

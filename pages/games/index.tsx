import * as React from 'react';
import {CssBaseline, ThemeOptions} from '@material-ui/core';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CardSingle from '@components/Cards/CardSingle';
import Date from '@components/date';
import Head from 'next/head';
import Layout from '@components/layout';
import {flipCard} from '@components/Cards/animation/flipCard';
import {moveTo} from '@components/Cards/animation/moveTo';
import {muiTheme} from '../../MaterialUI/theme';
import utilStyles from '../../styles/utils.module.scss';
import { getShuffledDeck } from '@components/Cards/utils/deck';

const useStyles = makeStyles(theme => ({
  table: {
    position: 'relative',
    height: 'calc(100vh - 65px)',
    overflow: 'hidden',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Game() {
  const classes = useStyles();

  const postData = {
    title: 'My Cool new Game!',
    contentHtml: '<span>Hi ma!</span>',
    date: new global.Date().toISOString(),
  };

  setTimeout(() => {
    moveTo('initCard', `#${'foo-bar'}`);
    moveTo('dealFirst', `#${'foo-bar'}`);
    flipCard('setToHidden', `#${'foo-bar'}-card-face`);
    setTimeout(() => {
      flipCard('show', `#${'foo-bar'}-card-face`);
    }, 500);
    flipCard('hide', `#${'foo-bar'}-card-back`);
  });

  const deck = getShuffledDeck();
  const card = deck.pop();

  return (
    <React.Fragment>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        {typeof window !== 'undefined' && (
          <MuiThemeProvider
            theme={createMuiTheme((muiTheme as unknown) as ThemeOptions)}
          >
            <CssBaseline />
            <div className={classes.table}>
              <CardSingle
                key={`card_${card?.id}`}
                id="foo-bar"
                card={{
                  rank: card?.rank,
                  suit: card?.suit,
                  backColor: card?.backColor,
                  color:
                    card?.suit === 'D' || card?.suit === 'H'
                      ? '#D33E43'
                      : '#1A1919',
                }}
              />
            </div>
          </MuiThemeProvider>
        )}
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </article>
      </Layout>
    </React.Fragment>
  );
}

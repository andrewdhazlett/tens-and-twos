import * as React from 'react';
import {CssBaseline, ThemeOptions} from '@material-ui/core';
import {Deck, PlayingCard} from 'typedeck';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import {mapToMyCard, ranks, suits} from '@components/Cards/utils/deck';
import CardSingle from '@components/Cards/CardSingle';
import Date from '@components/date';
import DealSomeCards from '@components/Cards/DealSomeCards';
import Head from 'next/head';
import Layout from '@components/layout';
import Overlay from '@components/Cards/Overlay';
import {flipCard} from '@components/Cards/animation/flipCard';
import {moveTo} from '@components/Cards/animation/moveTo';
import {muiTheme} from '../../MaterialUI/theme';
import utilStyles from '../../styles/utils.module.scss';

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

  const displayCard = (id: string) =>
    setTimeout(() => {
      moveTo('initCard', `#${id}`);
      moveTo('dealFirst', `#${id}`);
      flipCard('setToHidden', `#${id}-card-face`);
      setTimeout(() => {
        flipCard('show', `#${id}-card-face`);
      }, 500);
      flipCard('hide', `#${id}-card-back`);
    }, 100);

  const deck = Deck.Build(suits, ranks);
  deck.shuffle();
  const cards = deck.getCards().slice(0, 5) as PlayingCard[];
  cards.forEach(card => displayCard(mapToMyCard(card).id));

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
            <Overlay />
            <div className={classes.table}>
              {cards.map((card, index) => (
                <CardSingle
                  css={`
                    left: ${1 * index};
                  `}
                  key={`card_${mapToMyCard(card)?.id}`}
                  id={mapToMyCard(card)?.id}
                  card={card}
                />
              ))}
            </div>
            <DealSomeCards />
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

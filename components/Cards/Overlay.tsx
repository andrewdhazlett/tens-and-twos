import {
  AppBar,
  Button,
  CssBaseline,
  ThemeOptions,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {Deck, PlayingCard} from 'typedeck';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {mapToMyCard, ranks, suits} from './utils/deck';
import CardSingle from './CardSingle';
import IconVideo from '@material-ui/icons/Tv';
import React from 'react';
import {flipCard} from './animation/flipCard';
import {makeStyles} from '@material-ui/core/styles';
import {moveTo} from './animation/moveTo';
import {muiTheme} from '../../MaterialUI/theme';

const useStyles = makeStyles(theme => ({
  cards: {
    position: 'relative',
    left: 0,
    top: 0,
    zIndex: 20,
  },
  videoBase: {
    position: 'relative',
    left: 0,
    top: 0,
    zIndex: 10,
  },
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

export default function Overlay() {
  const classes = useStyles();
  const deck = Deck.Build(suits, ranks);
  deck.shuffle();
  const [shoe, setShoe] = React.useState<PlayingCard[]>(
    deck.getCards() as PlayingCard[]
  );
  const [inPlay, setInPlay] = React.useState<PlayingCard[]>([]);
  const [nextAction, setNextAction] = React.useState({
    key: 'dealHand',
    value: 'Deal Player Hand',
  });
  const [actionDisabled, setActionDisabled] = React.useState(false);

  const initHandCards = () => {
    setTimeout(() => {
      moveTo('initCard', `#${mapToMyCard(inPlay[0]).id}`);
      moveTo('dealFirst', `#${mapToMyCard(inPlay[0]).id}`);
      flipCard('setToHidden', `#${mapToMyCard(inPlay[0]).id}-card-face`);
      setTimeout(() => {
        flipCard('show', `#${mapToMyCard(inPlay[0]).id}-card-face`);
      }, 500);
      flipCard('hide', `#${mapToMyCard(inPlay[0]).id}-card-back`);

      setTimeout(() => {
        moveTo('initCard', `#${mapToMyCard(inPlay[1]).id}`);
        moveTo('dealSecond', `#${mapToMyCard(inPlay[1]).id}`, () =>
          setActionDisabled(false)
        );
        flipCard('setToHidden', `#${mapToMyCard(inPlay[1]).id}-card-face`);
        flipCard('hide', `#${mapToMyCard(inPlay[1]).id}-card-back`);
        setTimeout(() => {
          flipCard('show', `#${mapToMyCard(inPlay[1]).id}-card-face`);
        }, 500);
      }, 750);
    }, 100);
  };

  const initFlop = () => {
    setTimeout(() => {
      moveTo('initCard', `#${mapToMyCard(inPlay[2]).id}`);
      moveTo('dealFlopFirst', `#${mapToMyCard(inPlay[2]).id}`);
      flipCard('setToHidden', `#${mapToMyCard(inPlay[2]).id}-card-face`);
      flipCard('hide', `#${mapToMyCard(inPlay[2]).id}-card-back`);
      setTimeout(() => {
        flipCard('show', `#${mapToMyCard(inPlay[2]).id}-card-face`);
      }, 500);
      setTimeout(() => {
        moveTo('initCard', `#${mapToMyCard(inPlay[3]).id}`);
        moveTo('dealFlopSecond', `#${mapToMyCard(inPlay[3]).id}`);
        flipCard('setToHidden', `#${mapToMyCard(inPlay[3]).id}-card-face`);
        flipCard('hide', `#${mapToMyCard(inPlay[3]).id}-card-back`);
        setTimeout(() => {
          flipCard('show', `#${mapToMyCard(inPlay[3]).id}-card-face`);
        }, 500);
        setTimeout(() => {
          moveTo('initCard', `#${mapToMyCard(inPlay[4]).id}`);
          moveTo('dealFlopThird', `#${mapToMyCard(inPlay[4]).id}`, () =>
            setActionDisabled(false)
          );
          flipCard('setToHidden', `#${mapToMyCard(inPlay[4]).id}-card-face`);
          flipCard('hide', `#${mapToMyCard(inPlay[4]).id}-card-back`);
          setTimeout(() => {
            flipCard('show', `#${mapToMyCard(inPlay[4]).id}-card-face`);
          }, 500);
        }, 750);
      }, 750);
    }, 100);
  };

  const initRivers = () => {
    setTimeout(() => {
      moveTo('initCard', `#${mapToMyCard(inPlay[5]).id}`);
      moveTo('dealRiverFirst', `#${mapToMyCard(inPlay[5]).id}`);
      flipCard('setToHidden', `#${mapToMyCard(inPlay[5]).id}-card-face`);
      flipCard('hide', `#${mapToMyCard(inPlay[5]).id}-card-back`);
      flipCard('show', `#${mapToMyCard(inPlay[5]).id}-card-face`);
      setTimeout(() => {
        moveTo('initCard', `#${mapToMyCard(inPlay[6]).id}`);
        moveTo('dealRiverSecond', `#${mapToMyCard(inPlay[6]).id}`, () =>
          setActionDisabled(false)
        );
        flipCard('setToHidden', `#${mapToMyCard(inPlay[6]).id}-card-face`);
        flipCard('hide', `#${mapToMyCard(inPlay[6]).id}-card-back`);
        setTimeout(() => {
          flipCard('show', `#${mapToMyCard(inPlay[6]).id}-card-face`);
        }, 500);
      }, 750);
    }, 100);
  };

  const muckCard = (card: PlayingCard, i: number) => {
    flipCard('hide', `#${mapToMyCard(card).id}-card-face`);
    setTimeout(() => {
      moveTo('muckCard', `#${mapToMyCard(card).id}`, () =>
        setActionDisabled(false)
      );
      setTimeout(() => {
        flipCard('show', `#${mapToMyCard(card).id}-card-back`);
      }, 400);
    }, 100 * i);
  };

  const muckCards = () => {
    for (let i = 0; i < inPlay.length; i++) {
      muckCard(inPlay[i], i);
    }
  };

  return (
    <React.Fragment>
      <MuiThemeProvider
        theme={createMuiTheme((muiTheme as unknown) as ThemeOptions)}
      >
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconVideo className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              Overlay onto anything
            </Typography>

            <Button
              disabled={actionDisabled}
              variant={'contained'}
              color={'secondary'}
              onClick={e => {
                e.preventDefault();
                if (nextAction.key === 'dealHand') {
                  const newInPlay = inPlay;
                  const newerInPlay: PlayingCard[] = shoe.slice(0, 7);
                  const newShoe: PlayingCard[] = shoe.slice(7);
                  setShoe(() => newShoe);
                  newInPlay.push(...newerInPlay);
                  setInPlay(newInPlay);
                  setNextAction({key: 'initFlop', value: 'Deal Flop'});
                  initHandCards();
                  setActionDisabled(true);
                }
                if (nextAction.key === 'initFlop') {
                  setNextAction({key: 'initRiver', value: 'Deal Rivers'});
                  initFlop();
                  setActionDisabled(true);
                }
                if (nextAction.key === 'initRiver') {
                  setNextAction({key: 'nextHand', value: 'Next Hand'});
                  initRivers();
                  setActionDisabled(true);
                }
                if (nextAction.key === 'nextHand') {
                  setNextAction({key: 'dealHand', value: 'Deal Player Hand'});
                  muckCards();
                  setActionDisabled(true);
                }
              }}
            >
              {nextAction.value}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.table}>
          <React.Fragment>
            <div className={classes.cards}>
              {inPlay.map(
                (item: PlayingCard, i) =>
                  item && (
                    <CardSingle
                      key={`card_${i}`}
                      id={mapToMyCard(item).id}
                      card={item}
                    />
                  )
              )}
            </div>
          </React.Fragment>
        </div>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

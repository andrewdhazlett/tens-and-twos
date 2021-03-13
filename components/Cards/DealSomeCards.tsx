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
import {Callback} from 'gsap';
import {CardSingle} from './CardSingle';
import IconDeal from '@material-ui/icons/ViewColumn';
import React from 'react';
import {flipCard} from './animation/flipCard';
import {makeStyles} from '@material-ui/core/styles';
import {moveTo} from './animation/moveTo';
import {muiTheme} from '../../MaterialUI/theme';

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

const dealCard = ({
  card,
  target,
  callback,
}: {
  card: PlayingCard;
  target: string;
  callback?: Callback;
}) => {
  moveTo('initCard', `#${mapToMyCard(card).id}`);
  moveTo(target, `#${mapToMyCard(card).id}`, callback);
  flipCard('setToHidden', `#${mapToMyCard(card).id}-card-face`);
  setTimeout(() => {
    flipCard('show', `#${mapToMyCard(card).id}-card-face`);
  }, 500);
  flipCard('hide', `#${mapToMyCard(card).id}-card-back`);
};

const muckCard = ({
  card,
  delay,
  callback,
}: {
  card: PlayingCard;
  delay: number;
  callback: Callback;
}) => {
  flipCard('hide', `#${mapToMyCard(card).id}-card-face`);
  setTimeout(() => {
    moveTo('muckCard', `#${mapToMyCard(card).id}`, callback);
    setTimeout(() => {
      flipCard('show', `#${mapToMyCard(card).id}-card-back`);
    }, 400);
  }, delay);
};

const initHandCards = ({
  setActionDisabled,
  inPlay,
}: {
  setActionDisabled: (b: boolean) => void;
  inPlay: PlayingCard[];
}) => {
  setTimeout(() => {
    dealCard({card: inPlay[0], target: 'dealFirst'});

    setTimeout(() => {
      dealCard({
        card: inPlay[1],
        target: 'dealSecond',
        callback: () => setActionDisabled(false),
      });
    }, 750);
  }, 100);
};

const initFlop = ({
  setActionDisabled,
  inPlay,
}: {
  setActionDisabled: (b: boolean) => void;
  inPlay: PlayingCard[];
}) => {
  setTimeout(() => {
    dealCard({card: inPlay[2], target: 'dealFlopFirst'});
    setTimeout(() => {
      dealCard({card: inPlay[3], target: 'dealFlopSecond'});
      setTimeout(() => {
        dealCard({
          card: inPlay[4],
          target: 'dealFlopThird',
          callback: () => setActionDisabled(false),
        });
      }, 750);
    }, 750);
  }, 100);
};

const initRivers = ({
  setActionDisabled,
  inPlay,
}: {
  setActionDisabled: (b: boolean) => void;
  inPlay: PlayingCard[];
}) => {
  setTimeout(() => {
    dealCard({card: inPlay[5], target: 'dealRiverFirst'});
    setTimeout(() => {
      dealCard({
        card: inPlay[6],
        target: 'dealRiverSecond',
        callback: () => setActionDisabled(false),
      });
    }, 750);
  }, 100);
};

const muckCards = ({
  setActionDisabled,
  inPlay,
}: {
  setActionDisabled: (b: boolean) => void;
  inPlay: PlayingCard[];
}) => {
  for (let i = 0; i < inPlay.length; i++) {
    muckCard({
      card: inPlay[i],
      delay: 100 * i,
      callback: () => setActionDisabled(false),
    });
  }
};

export function DealSomeCards() {
  const classes = useStyles();
  const deck = Deck.Build(suits, ranks);
  deck.shuffle();
  const [shoe, setShoe] = React.useState<PlayingCard[]>(
    deck.getCards() as PlayingCard[]
  );
  const [inPlay, setInPlay] = React.useState<PlayingCard[]>([]);
  const [nextAction, setNextAction] = React.useState<
    | {key: 'dealHand'; value: 'Deal Player Hand'}
    | {key: 'initFlop'; value: 'Deal Flop'}
    | {key: 'initRiver'; value: 'Deal Rivers'}
    | {key: 'nextHand'; value: 'Next Hand'}
  >({
    key: 'dealHand',
    value: 'Deal Player Hand',
  });
  const [actionDisabled, setActionDisabled] = React.useState(false);

  return (
    <React.Fragment>
      <MuiThemeProvider
        theme={createMuiTheme((muiTheme as unknown) as ThemeOptions)}
      >
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconDeal className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              Example Poker Hand
            </Typography>

            <Button
              disabled={actionDisabled}
              variant={'contained'}
              color={'secondary'}
              onClick={e => {
                e.preventDefault();
                if (nextAction.key === 'dealHand') {
                  const inPlay = shoe.slice(0, 7);
                  setShoe(() => shoe.slice(7));
                  setInPlay(inPlay);
                  setNextAction({key: 'initFlop', value: 'Deal Flop'});
                  initHandCards({setActionDisabled, inPlay});
                  setActionDisabled(true);
                }
                if (nextAction.key === 'initFlop') {
                  setNextAction({key: 'initRiver', value: 'Deal Rivers'});
                  initFlop({inPlay, setActionDisabled});
                  setActionDisabled(true);
                }
                if (nextAction.key === 'initRiver') {
                  setNextAction({key: 'nextHand', value: 'Next Hand'});
                  initRivers({inPlay, setActionDisabled});
                  setActionDisabled(true);
                }
                if (nextAction.key === 'nextHand') {
                  setNextAction({key: 'dealHand', value: 'Deal Player Hand'});
                  muckCards({inPlay, setActionDisabled});
                  setActionDisabled(true);
                }
              }}
            >
              {nextAction.value}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.table}>
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
      </MuiThemeProvider>
    </React.Fragment>
  );
}

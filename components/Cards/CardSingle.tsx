import React, {useEffect} from 'react';
import {Base} from './graphics/Base';
import {CardBack} from './graphics/CardBack';
import {PlayingCard} from 'typedeck';
import {Rank} from './graphics/Rank';
import {Suit} from './graphics/Suit';
import {flipCard} from './animation/flipCard';
import {makeStyles} from '@material-ui/core/styles';
import {mapToMyCard} from './utils/deck';

const useStyles = makeStyles(() => ({
  cardContainer: {
    opacity: 0,
    width: 200,
    position: 'absolute',
  },
  back: {
    zIndex: 25,
  },
  base: {
    zIndex: 50,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rank: {
    zIndex: 100,
    position: 'absolute',
    left: 20,
    top: 20,
    width: 60,
  },
  suit: {
    zIndex: 150,
    position: 'absolute',
    top: 8,
    right: 5,
    width: 120,
  },
}));

export function CardSingle(props: {
  initialState?: 'face-down' | 'turn-face-up' | 'show_face' | 'finished';
  id: string;
  card: PlayingCard;
  status?: unknown;
}) {
  const myCard = {
    ...mapToMyCard(props.card),
    backColor: '#1A1919',
    color:
      mapToMyCard(props.card).suit === 'D' ||
      mapToMyCard(props.card).suit === 'H'
        ? '#D33E43'
        : '#1A1919',
  };

  const classes = useStyles();
  // S=Spades, D=Diamonds, H=Hearts, C=Clubs
  const [cardStatus, setCardStatus] = React.useState(props.initialState);
  useEffect(() => {
    if (cardStatus === 'face-down') {
      flipCard('setToHidden', `#${myCard.id}-card-face`);
      flipCard('setToShown', `#${myCard.id}-card-back`);
    }
    if (cardStatus === 'turn-face-up') {
      flipCard('hide', `#${myCard.id}-card-back`, () =>
        setCardStatus('show_face')
      );
    }
    if (cardStatus === 'show_face') {
      flipCard('show', `#${myCard.id}-card-face`, () =>
        setCardStatus('finished')
      );
    }
  });

  return (
    <div id={myCard.id} className={classes.cardContainer}>
      <div id={`${myCard.id}-card-face`}>
        <Suit card={myCard} className={classes.suit} />
        <Rank card={myCard} className={classes.rank} />
        <Base color={myCard.backColor ?? 'black'} className={classes.base} />
      </div>
      <CardBack
        className={classes.back}
        id={`${myCard.id}-card-back`}
        color={myCard.backColor}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck noImplicitAny
import {CardName, PlayingCard, Suit} from 'typedeck';
// yuck
function shuffle(a: Array<unknown>) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type MyRank = 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K';
type MySuit = 'S' | 'H' | 'C' | 'D';
export interface Card {
  id?: string;
  rank: MyRank;
  suit: MySuit;
  color?: string;
  backColor?: string;
}

const getRank = (name: CardName): MyRank => {
  switch (name) {
    case CardName.Ace:
      return 'A';
    case CardName.Jack:
      return 'J';
    case CardName.Queen:
      return 'Q';
    case CardName.King:
      return 'K';
    default:
      return name + 1;
  }
};

const addCard = ({
  deck,
  rank,
  suit,
}: {
  deck: Card[];
  rank: MyRank;
  suit: MySuit;
}): Card[] => {
  const card = new PlayingCard(
    rank === 'A'
      ? CardName.Ace
      : rank === 'J'
      ? CardName.Jack
      : rank === 'Q'
      ? CardName.Queen
      : rank === 'K'
      ? CardName.King
      : ((rank - 1) as CardName),
    suit === 'S'
      ? Suit.Spades
      : suit === 'H'
      ? Suit.Hearts
      : suit === 'C'
      ? Suit.Clubs
      : suit === 'D'
      ? Suit.Diamonds
      : never
  );
  const suit = card.cardName ?? 'S';
  const rank = getRank(card.cardName) ?? 'A';

  return [
    ...deck,

    {
      id: `${suit}_${rank}`,
      suit,
      rank: `${rank}`,
    },
  ];
};

const suits: MySuit[] = ['S', 'H', 'C', 'D'];
const ranks: MyRank[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

const getOrderedDeck = (): Card[] =>
  suits.reduce(
    (deck, suit) =>
      ranks.reduce((deck, rank) => addCard({deck, rank, suit}), deck),
    []
  );

export const getShuffledDeck = (): Card[] => shuffle(getOrderedDeck());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck noImplicitAny
// yuck
function shuffle(a: Array<unknown>) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface Card {
  id?: string;
  rank: string;
  suit: string;
  color?: string;
  backColor?: string;
}

const addCard = ({
  deck,
  rank,
  suit,
}: {
  deck: Card[];
  rank: Rank;
  suit: Suit;
}): Card[] => [
  ...deck,
  {
    id: `${suit}_${rank}`,
    suit,
    rank: `${rank}`,
  },
];

type Suit = 'S' | 'H' | 'C' | 'D';
const suits: Suit[] = ['S', 'H', 'C', 'D'];
type Rank = 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K';
const ranks: Rank[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

const getOrderedDeck = (): Card[] =>
  suits.reduce(
    (deck, suit) =>
      ranks.reduce((deck, rank) => addCard({deck, rank, suit}), deck),
    []
  );

export const getShuffledDeck = (): Card[] => shuffle(getOrderedDeck());

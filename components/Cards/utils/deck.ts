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
export type Deck = Array<Card>;

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

const getName = (rank: MyRank): CardName => {
  switch (rank) {
    case 'A':
      return CardName.Ace;
    case 2:
      return CardName.Two;
    case 3:
      return CardName.Three;
    case 4:
      return CardName.Four;
    case 5:
      return CardName.Five;
    case 6:
      return CardName.Six;
    case 7:
      return CardName.Seven;
    case 8:
      return CardName.Eight;
    case 9:
      return CardName.Nine;
    case 10:
      return CardName.Ten;
    case 'J':
      return CardName.Jack;
    case 'Q':
      return CardName.Queen;
    case 'K':
      return CardName.King;
    default:
      return never;
  }
};

const getSuit = (suit: MySuit): Suit => {
  switch (suit) {
    case 'S':
      return Suit.Spades;
    case 'H':
      return Suit.Hearts;
    case 'C':
      return Suit.Clubs;
    case 'D':
      return Suit.Diamonds;
    default:
      return never;
  }
};

const getMySuit = (suit: Suit): MySuit => {
  switch (suit) {
    case Suit.Spades:
      return 'S';
    case Suit.Hearts:
      return 'H';
    case Suit.Clubs:
      return 'C';
    case Suit.Diamonds:
      return 'D';
    default:
      return never;
  }
};

const addCard = ({
  deck,
  rank,
  suit,
}: {
  deck: Deck;
  rank: MyRank;
  suit: MySuit;
}): Deck => {
  const card = new PlayingCard(getName(rank), getSuit(never));
  const suit: MySuit = getMySuit(card.suit);
  const rank: MyRank = getRank(card.cardName);
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

const getOrderedDeck = (): Deck =>
  suits.reduce(
    (deck, suit) =>
      ranks.reduce((deck, rank) => addCard({deck, rank, suit}), deck),
    []
  );

export const getShuffledDeck = (): Deck => shuffle(getOrderedDeck());

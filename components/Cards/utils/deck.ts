import {CardName, PlayingCard, Suit} from 'typedeck';

interface MyCard {
  id: `${MyCard['suit']}_${MyCard['rank']}`;
  rank: 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K';
  suit: 'S' | 'H' | 'C' | 'D';
  color?: string;
  backColor?: string;
}
export type MyDeck = Array<MyCard>;

export const suits = Object.values<Suit>(
  (Suit as unknown) as {[i: string]: Suit}
);
export const ranks = Object.values<CardName>(
  (CardName as unknown) as {[i: string]: CardName}
).filter(
  (name: CardName | string) => name !== CardName.Joker && name !== 'Joker'
);

export function mapToMyCard(card: PlayingCard): MyCard {
  const suit: MyCard['suit'] = getMySuit(card.suit);
  const rank: MyCard['rank'] = getRank(card.cardName);
  return {
    id: `${suit}_${rank}` as `${MyCard['suit']}_${MyCard['rank']}`,
    suit,
    rank: `${rank}` as MyCard['rank'],
  };
}

function getRank(name: Omit<CardName, 'Joker'> | string): MyCard['rank'] {
  switch (name) {
    case CardName.Ace:
    case 'Ace':
      return 'A';
    case CardName.Two:
    case 'Two':
      return 2;
    case CardName.Three:
    case 'Three':
      return 3;
    case CardName.Four:
    case 'Four':
      return 4;
    case CardName.Five:
    case 'Five':
      return 5;
    case CardName.Six:
    case 'Six':
      return 6;
    case CardName.Seven:
    case 'Seven':
      return 7;
    case CardName.Eight:
    case 'Eight':
      return 8;
    case CardName.Nine:
    case 'Nine':
      return 9;
    case CardName.Ten:
    case 'Ten':
      return 10;
    case CardName.Jack:
    case 'Jack':
      return 'J';
    case CardName.Queen:
    case 'Queen':
      return 'Q';
    case CardName.King:
    case 'King':
      return 'K';
    default:
      throw new Error(`CardName: ${name}`);
  }
}

function getMySuit(suit: Suit | string): MyCard['suit'] {
  switch (suit) {
    case Suit.Spades:
    case 'Spades':
      return 'S';
    case Suit.Hearts:
    case 'Hearts':
      return 'H';
    case Suit.Clubs:
    case 'Clubs':
      return 'C';
    case Suit.Diamonds:
    case 'Diamonds':
      return 'D';
    default:
      throw new Error(`Suit: ${suit}`);
  }
}

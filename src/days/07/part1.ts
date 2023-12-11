import { getData } from '../../shared';

const data = getData("07/input.txt");

export enum Card {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14,
}

export enum HandType {
  None = 0,
  High = 1,
  Pair = 2,
  TwoPair = 3,
  ThreeOfAKind = 4,
  FullHouse = 5,
  FourOfAKind = 6,
  FiveOfAKind = 7,
}

const cardMap: { [key: string | number]: Card } = {
  2: Card.Two,
  3: Card.Three,
  4: Card.Four,
  5: Card.Five,
  6: Card.Six,
  7: Card.Seven,
  8: Card.Eight,
  9: Card.Nine,
  T: Card.Ten,
  J: Card.Jack,
  Q: Card.Queen,
  K: Card.King,
  A: Card.Ace,
};

export interface Hand {
 cards: number[];
 bid: number;
 type?: HandType;
}

export type CardFrequencyMap = { [key: string]: number };

function getCardFrequencyMap(hand: Card[]): CardFrequencyMap {
  const frequencyMap: CardFrequencyMap = {};

  for (const card of hand) {
    const cardName = Card[card].toString();
    frequencyMap[cardName] = (frequencyMap[cardName] || 0) + 1;
  }

  return frequencyMap;
}

export const createHand = (hand: string): Hand => {
  const [cards, bid] = hand.split(" ");
  const cardArray = cards.split("").map((card) => cardMap[card]);
  return {
    cards: cardArray,
    bid: Number(bid),
    type: evaluateHand(cardArray),
  };
};

export const evaluateHand = (cards: number[]): HandType => {
  const cardFrequencyMap = getCardFrequencyMap(cards);
  const uniqueCards = Object.keys(cardFrequencyMap).length;
  if (uniqueCards === 1) {
    return HandType.FiveOfAKind;
  }
  if (uniqueCards === 5) {
    return HandType.High;
  }
  if (uniqueCards === 2) {
    if (Object.values(cardFrequencyMap).includes(4)) {
      return HandType.FourOfAKind;
    }

    if (Object.values(cardFrequencyMap).filter((value) => value === 2 || value === 3).length === 2) {
      return HandType.FullHouse;
    }
  }
  if (Object.values(cardFrequencyMap).includes(3)) {
    return HandType.ThreeOfAKind;
  }
  if (Object.values(cardFrequencyMap).filter((value) => value === 2).length === 2) {
    return HandType.TwoPair;
  }
  if (Object.values(cardFrequencyMap).includes(2)) {
    return HandType.Pair;
  }

  return HandType.None;
};

export const compareHands = (hand1: Hand, hand2: Hand): number => {
  if (hand1.type !== undefined && hand2.type !== undefined) {
    const match = hand1.type === hand2.type;
    if (match) {
      for (const [i, card] of hand1.cards.entries()) {
        if (card !== hand2.cards[i]) {
          return card > hand2.cards[i] ? 1 : -1;
        }
      }
      return 0;
    }
    return hand1.type > hand2.type ? 1 : -1;
  }
  return 0;
}

export const getWinnings = (data: string[]): number => {
  const hands = data.filter((hand) => hand).map(createHand);
  const ranked = hands.sort(compareHands);
  return ranked.reduce((sum, hand, i) => {
    return sum + (i + 1) * hand.bid;
  }, 0);
};

// export default () => getWinnings(data);
export default () => true;

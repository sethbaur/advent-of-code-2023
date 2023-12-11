import { getData } from '../../shared';
import { evaluateHand, HandType, Hand, CardFrequencyMap, compareHands } from "./part1";

const data = getData("07/input.txt");

export enum Card {
  Joker = 0,
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

function getCardFrequencyMap(hand: Card[]): CardFrequencyMap {
  const frequencyMap: CardFrequencyMap = {};

  for (const card of hand) {
    const cardName = Card[card].toString();
    frequencyMap[cardName] = (frequencyMap[cardName] || 0) + 1;
  }

  return frequencyMap;
}

export const evalHandWithJoker = (cards: Card[]): HandType => {
  const cardFrequencyMap = getCardFrequencyMap(cards);
  const uniqueCards = Object.keys(cardFrequencyMap).length;
  const jokerCount = cardFrequencyMap.Joker || 0;
  if (uniqueCards === 2 || uniqueCards === 1) {
    return HandType.FiveOfAKind;
  }
  if (uniqueCards === 3) {
    if (jokerCount === 1 && !Object.values(cardFrequencyMap).includes(3)) {
      return HandType.FullHouse;
    }
    return HandType.FourOfAKind;
  }
  if (uniqueCards === 4) {
    return HandType.ThreeOfAKind;
  }
  if (uniqueCards === 5) {
    return HandType.Pair;
  }
  return HandType.None;
};

export const evalHand = (cards: Card[]): HandType => {
  if (cards.includes(Card.Joker)) {
    return evalHandWithJoker(cards);
  }
  return evaluateHand(cards);
};

export const createHand = (hand: string): Hand => {
  const [cards, bid] = hand.split(" ");
  const cardArray = cards.split("").map((card) => cardMap[card]);
  return {
    cards: cardArray,
    bid: Number(bid),
    type: evalHand(cardArray),
  };
};

const cardMap: { [key: string | number]: Card } = {
  J: Card.Joker,
  2: Card.Two,
  3: Card.Three,
  4: Card.Four,
  5: Card.Five,
  6: Card.Six,
  7: Card.Seven,
  8: Card.Eight,
  9: Card.Nine,
  T: Card.Ten,
  Q: Card.Queen,
  K: Card.King,
  A: Card.Ace,
};

export const getWinnings = (data: string[]): number => {
  const hands = data.filter((hand) => hand).map(createHand);
  const ranked = hands.sort(compareHands);
  return ranked.reduce((sum, hand, i) => {
    return sum + (i + 1) * hand.bid;
  }, 0);
};

// export default () => getWinnings(data);
export default () => true;

import { getData } from "../../shared";
import { getResults } from "./part1";

const data = getData("04/input.txt");

type Card = number[];

export const getWinningNumbers = (winners: number[], chosen: number[]): number => {
  return chosen.filter((num: number) => winners.includes(num)).length;
};

export const setupCard = (line: string, id: number): Card => {
  const [winners, chosen] = getResults(line);
  const winnerCount = getWinningNumbers(winners, chosen);
  return Array.from(new Array(winnerCount), (_, i) => i + id + 1);
};

export const getCardCount = (card: Card, cards: Card[]): number => {
  return 1 + card.reduce((sum: number, winner: number) => {
    return sum + getCardCount(cards[winner], cards);
  }, 0);
};

export const calculateCardCount = (lines: string[]) => {
  const cards = lines.map((line, i) => setupCard(line, i));

  return cards.reduce((sum: number, card: Card) => {
    return sum + getCardCount(card, cards);
  }, 0);
};

export default calculateCardCount(data);

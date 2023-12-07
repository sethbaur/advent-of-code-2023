import { getData } from "../../shared";

const data = getData("04/input.txt");

export const getResults = (line: string): number[][] => {
  const [, winners, chosen] = line.match(/Card\s+\d+: ([\d\s]+)\|([\d\s]+)/) as RegExpMatchArray;
  return [
    winners.trim().split(/\s+/g).map((num: string) => parseInt(num)),
    chosen.trim().split(/\s+/g).map((num: string) => parseInt(num)),
  ];
};

export const getWinningScore = (winners: number[], chosen: number[]): number => {
  const wins = chosen.filter((num: number) => winners.includes(num));
  if (wins.length === 0) return 0;
  return Math.pow(2, wins.length - 1);
};

export const sumWinningScores = (data: string[]): number => {
  const cards = data.map((line) => getResults(line));
  return cards.reduce((sum: number, [winners, chosen]: number[][]) => {
    return sum + getWinningScore(winners, chosen);
  }, 0);
};

export default sumWinningScores(data);

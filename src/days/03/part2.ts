import { getData } from "../../shared";

const data = getData("03/input.txt");

import { getNumbersWithPosition, Number } from "./part1";

export const getGearsWithPosition = (line: string): number[] => {
  const gears = [];
  const regex = /\*/g;
  let match;

  while ((match = regex.exec(line)) != null) {
    gears.push(match.index);
  }

  return gears;
};

export const getAdjacentNumbers = (gearPos: number, row: number, numbers: Number[][]): number[] => {
  const prevRow = numbers[row - 1];
  const currentRow = numbers[row];
  const nextRow = numbers[row + 1];

  const otherRowCheck = (num: Number): boolean => {
    const positions = Array.from(new Array(num.length), (_, i) => i + num.position);
    return positions.some((pos) => pos >= gearPos - 1 && pos <= gearPos + 1);
  };
  const sameRowCheck = (num: Number): boolean => {
    return num.position === gearPos - 1 || num.position === gearPos + 1 || num.position + num.length === gearPos;
  };

  const prevRowNumbers = prevRow?.filter(otherRowCheck) ?? [];
  const currentRowNumbers = currentRow?.filter(sameRowCheck) ?? [];
  const nextRowNumbers = nextRow?.filter(otherRowCheck) ?? [];

  return [...prevRowNumbers, ...currentRowNumbers, ...nextRowNumbers].map(num => num.number);
};

export const sumGearRatios = (data: string[]) => {
  const numbers = data.map((line) => getNumbersWithPosition(line));
  const gears = data.map((line) => getGearsWithPosition(line));

  return gears.reduce((sum: number, gearPositions: number[], row: number) => {
    return sum + gearPositions.reduce((rowSum: number, gearPos: number) => {
      const adjacentNumbers = getAdjacentNumbers(gearPos, row, numbers);
      if (adjacentNumbers.length !== 2) return rowSum;
      return rowSum + adjacentNumbers[0] * adjacentNumbers[1];
    }, 0);
  }, 0);
};

export default sumGearRatios(data);

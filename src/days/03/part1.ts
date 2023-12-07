import { getData } from "../../shared";

const data = getData("03/input.txt");

export interface Number {
  number: number;
  position: number;
  length: number;
}

export const getNumbersWithPosition = (line: string): { number: number, position: number, length: number }[] => {
  const numbers = [];
  const regex = /\d+/g;
  let match;

  while ((match = regex.exec(line)) != null) {
    numbers.push({
      number: parseInt(match[0]),
      position: match.index,
      length: match[0].length,
    });
  }

  return numbers;
};

interface Symbol {
  symbol: string;
  position: number;
}

export const getSymbolsWithPosition = (line: string): Symbol[] => {
  const symbols = [];
  const regex = /[^\.\d]/g;
  let match;

  while ((match = regex.exec(line)) != null) {
    symbols.push({
      symbol: match[0],
      position: match.index,
    });
  }

  return symbols;
};

export const hasAdjacentSymbol = (number: Number, row: number, symbols: Symbol[][]): boolean => {
  const prevRow = symbols[row - 1];
  const currentRow = symbols[row];
  const nextRow = symbols[row + 1];

  const otherRowCheck = (sym: Symbol): boolean => {
    return sym.position >= number.position - 1 && sym.position <= number.position + number.length;
  };
  const sameRowCheck = (sym: Symbol): boolean => {
    return sym.position === number.position - 1 || sym.position === number.position + number.length;
  };

  if (prevRow && prevRow.some(otherRowCheck)) return true;
  if (currentRow && currentRow.some(sameRowCheck)) return true;
  if (nextRow && nextRow.some(otherRowCheck)) return true;

  return false;
};

export const run = (lines: string[]) => {
  const numbers = lines.map((line) => getNumbersWithPosition(line));
  const symbols = lines.map((line) => getSymbolsWithPosition(line));
  let partNumbers = 0;

  for (const [i, line] of numbers.entries()) {
    for (const number of line) {
      if (hasAdjacentSymbol(number, i, symbols)) {
        partNumbers += number.number;
      }
    }
  }

  return partNumbers;
};

export default run(data);

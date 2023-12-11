import { parseData } from "../../shared";
import { getNumbersWithPosition, getSymbolsWithPosition, run, hasAdjacentSymbol } from "./part1";
import { getGearsWithPosition, getAdjacentNumbers, sumGearRatios } from "./part2";

const sampleData = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();

const data = parseData(sampleData);

describe("day 3, part 1", () => {
  test("getNumbersWithPosition", () => {
    const line = "467..114..";
    expect(getNumbersWithPosition(line)).toEqual([
      { number: 467, position: 0, length: 3 },
      { number: 114, position: 5, length: 3 },
    ]);
  });

  test("getSymbolsWithPosition", () => {
    const line = "?....+.58.";
    expect(getSymbolsWithPosition(line)).toEqual([
      { symbol: "?", position: 0 },
      { symbol: "+", position: 5 },
    ]);
  });

  test("hasAdjacentSymbol", () => {
    const number = { number: 45, position: 3, length: 2 };
    const symbols = [
      "...+....",
      "...45...",
      "........",
    ].map(line => getSymbolsWithPosition(line));

    expect(hasAdjacentSymbol(number, 1, symbols)).toBe(true);
  });

  test("part 1", () => {
    expect(run(data)).toBe(4361);
  });
});

const sampleData2 = `
.23466..
.22*....
........
........
........
........
`.trim();

const data2 = parseData(sampleData2);

describe("day 3, part 2", () => {
  test("getGearsWithPosition", () => {
    const line = "*...*..";
    expect(getGearsWithPosition(line)).toEqual([0, 4]);
  });

  test("getAdjacentNumbers" , () => {
    const numbers = [
      [{ number: 244, position: 2, length: 3 }],
      [{ number: 44, position: 1, length: 2 }],
      [{ number: 3, position: 6, length: 1 }],
    ];

    expect(getAdjacentNumbers(3, 1, numbers)).toEqual([244, 44]);
  });

  test("part 2", () => {
    expect(sumGearRatios(data)).toBe(467835);
    expect(sumGearRatios(data2)).toBe(23466 * 22);
  });
});

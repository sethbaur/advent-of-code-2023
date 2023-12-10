import { parseData } from "../../shared";
import { getDistance, getWinners, multiplyWinners, getRaces, calculateRaces } from "./part1";
import { getRace, calculateRaces as calculateRaces2 } from "./part2";

const sampleData = `
Time:      7  15   30
Distance:  9  40  200
`.trim();

const data = parseData(sampleData);

describe("day 0, part 1", () => {
  test("getDistance", () => {
    expect(getDistance(7, 1)).toBe(6);
    expect(getDistance(7, 4)).toBe(12);
    expect(getDistance(7, 7)).toBe(0);
    expect(getDistance(7, 0)).toBe(0);
    expect(getDistance(7, 6)).toBe(6);
  });

  test("getWinners", () => {
    expect(getWinners(7, 9)).toBe(4);
  });

  test("multiplyWinners", () => {
    expect(multiplyWinners([[7, 9], [15, 40], [30, 200]])).toBe(288);
  });

  test("getRaces", () => {
    expect(getRaces(data)).toEqual([[7, 9], [15, 40], [30, 200]]);
  });

  test("part 1", () => {
    expect(calculateRaces(data)).toBe(288);
  });
});

describe("day 0, part 2", () => {
  test("getRace", () => {
    expect(getRace(data)).toEqual([71530, 940200]);
  });

  test("part 2", () => {
    expect(calculateRaces2(data)).toBe(71503);
  });
});

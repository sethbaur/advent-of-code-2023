import { sumCalibrations } from "./part1";
import { sumCalibrations  as sumCalibrations2 } from "./part2";
import { parseData } from "../../shared";

const sampleData = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim();

const data = parseData(sampleData);

const sampleData2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim();

const data2 = parseData(sampleData2);

describe("day one", () => {
  test("part 1 succeeds", () => {
    expect(sumCalibrations(data)).toBe(142);
  });

  test("part 2 succeeds", () => {
    expect(sumCalibrations2(data2)).toBe(281);
  });
});

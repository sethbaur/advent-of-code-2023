import { parseData } from "../../shared";
import { getSeeds, generateMap, execMap, processSeed, buildAlmanac, getLowestLocation } from "./part1";
import { getSeeds as getSeeds2, getLowestLocation as getLowestLocation2 } from "./part2";

const sampleData = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`.trim();

const data = parseData(sampleData);

describe("day 0, part 1", () => {
  test("getSeeds", () => {
    expect(getSeeds(sampleData)).toEqual([79, 14, 55, 13]);
  });

  test("generateMap", () => {
    const map = generateMap("seed-to-soil", data);
    expect(map[0](49)).toBe(undefined);
    expect(map[0](98)).toBe(50);
    expect(map[0](99)).toBe(51);
    expect(map[1](50)).toBe(52);
    expect(map[1](51)).toBe(53);
    expect(map[2](51)).toBe(51);
  });

  test("execMap", () => {
    const map = generateMap("seed-to-soil", data);
    expect(execMap(49, map)).toBe(49);
    expect(execMap(98, map)).toBe(50);
    expect(execMap(99, map)).toBe(51);
    expect(execMap(50, map)).toBe(52);
    expect(execMap(51, map)).toBe(53);
    expect(execMap(51, map)).toBe(53);
    expect(execMap(1, map)).toBe(1);
  });

  test("processSeed", () => {
    const almanac = buildAlmanac(sampleData);
    expect(processSeed(79, almanac)).toBe(82);
  });

  test("part 1", () => {
    expect(getLowestLocation(sampleData)).toBe(35);
  });
});

describe("day 0, part 2", () => {
  test("getSeeds", () => {
    expect(getSeeds2(sampleData)).toEqual([
      [79, 14],
      [55, 13],
    ]);
  });

  test("part 2", () => {
    expect(getLowestLocation2(sampleData)).toBe(46);
  });
});

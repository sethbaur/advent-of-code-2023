import { getRawData } from "../../shared";
import { buildAlmanac, processSeed } from "./part1";

const data = getRawData("05/input.txt");

export const getSeeds = (almanac: string): number[][] => {
  const regex = /seeds:\s+(.*)/;
  const seedString = almanac.match(regex)?.[1];
  const seedNumbers: number[] = seedString ? seedString.split(" ").map(Number) : [];
  const seeds: number[][] = [];

  for (let i = 0; i < seedNumbers.length; i += 2) {
    seeds.push([seedNumbers[i], seedNumbers[i + 1]]);
  }

  return seeds;
};

export const getLowestLocation = (almanacString: string): number => {
  const seeds = getSeeds(almanacString);
  const almanac = buildAlmanac(almanacString);
  return seeds.reduce((lowest, seedRange) => {
    const [start, end] = seedRange;
    let low = lowest;
    for (let i = start; i < start + end; i++) {
      const loc = processSeed(i, almanac);
      if (low === 0 || loc < low) {
        low = loc;
      }
    }
    return low;
  }, 0);
};

// export default () => { return getLowestLocation(data) };
export default () => true;

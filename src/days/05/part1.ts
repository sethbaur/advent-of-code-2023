import { getRawData, parseData } from "../../shared";

const data = getRawData("05/input.txt");

export const getSeeds = (almanac: string): number[] => {
  const regex = /seeds:\s+(.*)/;
  const seedString = almanac.match(regex)?.[1];
  return seedString ? seedString.split(" ").map(Number) : [];
};

type MapFunction = (id: number) => number | undefined;
export type Map = MapFunction[];

export const generateMap = (key: string, almanac: string[]): MapFunction[] => {
  let index = almanac.indexOf(`${key} map:`);
  const mapStrings = [];
  const maps: MapFunction[] = [];

  while (almanac[++index]) {
    mapStrings.push(almanac[index].trim());
  }

  for (const mapString of mapStrings) {
    const [destination, source, range] = mapString.split(" ").map(Number);
    const mapFunction = (seed: number) => {
      if (seed < source || seed >= source + range) {
        return undefined;
      }
      const difference = seed - source;
      return destination + difference;
    };
    maps.push(mapFunction);
  }

  maps.push((id: number) => id);
  return maps;
};

export const execMap = (id: number, map: Map): number => {
  let result;
  let i = 0;
  while (result === undefined) {
    result = map[i](id);
    i++;
  }
  return result as number;
};

export const processSeed = (seed: number, almanac: Map[]): number => {
  return almanac.reduce((seed, map) => execMap(seed, map), seed);
};

export const buildAlmanac = (almanacString: string): Map[] => {
  const data = parseData(almanacString);
  return [
    generateMap("seed-to-soil", data),
    generateMap("soil-to-fertilizer", data),
    generateMap("fertilizer-to-water", data),
    generateMap("water-to-light", data),
    generateMap("light-to-temperature", data),
    generateMap("temperature-to-humidity", data),
    generateMap("humidity-to-location", data),
  ];
};

export const getLowestLocation = (almanacString: string): number => {
  const seeds = getSeeds(almanacString);
  const almanac = buildAlmanac(almanacString);
  const locations = seeds.map((seed) => processSeed(seed, almanac));
  return Math.min(...locations);
};

export default getLowestLocation(data);

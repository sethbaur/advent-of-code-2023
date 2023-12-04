import { parseData } from "../../shared";
import { possibleGames, createGame, createRound } from "./part1";
import { powersOfGames } from "./part2";

const sampleData = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`.trim();

const data = parseData(sampleData);

describe("day 0, part 1", () => {
  test("createRound", () => {
    expect(createRound("3 blue, 4 red")).toEqual({
      groups: [
        { color: "blue", count: 3 },
        { color: "red", count: 4 },
      ],
    });
  });

  test("createGame", () => {
    expect(createGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toEqual({
      id: 1,
      rounds: [
        {
          groups: [
            { color: "blue", count: 3 },
            { color: "red", count: 4 },
          ],
        },
        {
          groups: [
            { color: "red", count: 1 },
            { color: "green", count: 2 },
            { color: "blue", count: 6 },
          ],
        },
        {
          groups: [
            { color: "green", count: 2 },
          ],
        },
      ],
    });
  });

  test("part 1", () => {
    expect(possibleGames(data)).toBe(8);
  });
});

describe("day 0, part 2", () => {
  test("part 2", () => {
    expect(powersOfGames(data)).toBe(2286);
  });
});

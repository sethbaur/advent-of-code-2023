import { getData } from "../../shared";

const data = getData("02/input.txt");

interface Group {
  color: "red" | "green" | "blue";
  count: number;
}

interface Round {
  groups: Group[];
}

interface Game {
  id: number;
  rounds: Round[];
}

const totalRed = 12;
const totalGreen = 13;
const totalBlue = 14;
const total = totalRed + totalGreen + totalBlue;

export const createRound = (rawRound: string): Round => {
  const regex = /(\d+)\s(red|green|blue)/g;
  const groups: Group[] = [];
  let match;

  while ((match = regex.exec(rawRound)) != null) {
    groups.push({
      color: match[2] as "red" | "green" | "blue",
      count: parseInt(match[1]),
    });
    regex.lastIndex = match.index + 1;
  }
  return { groups };
};

export const createGame = (line: string): Game => {
  const regex = /Game (\d+):\s(.+)/;
  const matches = line.match(regex);
  return {
    id: parseInt(matches?.[1] ?? "0"),
    rounds: matches?.[2].split(";").map((round) => {
      return createRound(round.trim());
    }) ?? []
  }
};

export const possibleGames = (data: string[]): number => {
  const games = data.map((line) => createGame(line));

  return games.reduce((sum: number, game: Game) => {
    const isPossible = game.rounds.every((round) => {
      const totalColors = round.groups.reduce((sum: number, group: Group) => {
        return sum + group.count;
      }, 0);
      const redCount = round.groups.find((group) => group.color === "red")?.count ?? 0;
      const greenCount = round.groups.find((group) => group.color === "green")?.count ?? 0;
      const blueCount = round.groups.find((group) => group.color === "blue")?.count ?? 0;

      if (totalColors > total || redCount > totalRed || greenCount > totalGreen || blueCount > totalBlue) {
        return false;
      }

      return true;
    });

    return isPossible ? sum + game.id : sum;
  }, 0);
};

export default possibleGames(data);

import { getData } from "../../shared";
import { createGame } from "./part1";

const data = getData("02/input.txt");

export const powersOfGames = (data: string[]) => {
  const games = data.map((line) => createGame(line));

  return games.reduce((sum: number, game) => {
    const mostColors = game.rounds.reduce((colors, round) => {
      const redCount = round.groups.find((group) => group.color === "red")?.count ?? 0;
      const greenCount = round.groups.find((group) => group.color === "green")?.count ?? 0;
      const blueCount = round.groups.find((group) => group.color === "blue")?.count ?? 0;

      if (redCount > colors.red) {
        colors.red = redCount;
      }
      if (greenCount > colors.green) {
        colors.green = greenCount;
      }
      if (blueCount > colors.blue) {
        colors.blue = blueCount;
      }
      return colors;
    }, { red: 0, green: 0, blue: 0 });

    return sum + (mostColors.red * mostColors.green * mostColors.blue);
  }, 0);
};

export default powersOfGames(data);

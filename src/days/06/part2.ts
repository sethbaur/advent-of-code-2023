import { getData } from '../../shared';
import { getWinners } from "./part1";

const data = getData("06/input.txt");


export const getRace = (data: string[]): number[] => {
  const times = (data[0].match(/(\d+)/g) as RegExpMatchArray);
  const goals = (data[1].match(/(\d+)/g) as RegExpMatchArray);
  return [Number(times.join("")), Number(goals.join(""))];
}

export const calculateRaces = (data: string[]): number => {
  const [time, goal] = getRace(data);
  return getWinners(time, goal);
};

// export default () => calculateRaces(data);
export default true;

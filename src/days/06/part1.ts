import { getData } from '../../shared';

const data = getData("06/input.txt");

export const getDistance = (time: number, speed: number): number => {
  return (time - speed) * speed;
};

export const getWinners = (time: number, goal: number): number => {
  const speeds = Array.from(new Array(time + 1), (_, i) => i);
  return speeds.filter((speed) => getDistance(time, speed) > goal).length;
};

export const multiplyWinners = (races: number[][]): number => {
  return races.reduce((product, race) => {
    const [time, goal] = race;
    return product * getWinners(time, goal);
  }, 1);
};

export const getRaces = (data: string[]): number[][] => {
  const times = (data[0].match(/(\d+)/g) as RegExpMatchArray).map(Number);
  const goals = (data[1].match(/(\d+)/g) as RegExpMatchArray).map(Number);
  return times.map((time, i) => [time, goals[i]]);
};

export const calculateRaces = (data: string[]): number => {
  const races = getRaces(data);
  return multiplyWinners(races);
};

// export default () => calculateRaces(data);
export default () => true;

import { getData } from "../../shared";

const data = getData("01/input.txt");

export const sumCalibrations = (data: string[]) => {
  return data.map((line) => line.match(/\d/g) as RegExpMatchArray)
    .reduce((sum: number, numbers: string[]) => {
      return sum + parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    }, 0);
};

export default sumCalibrations(data);

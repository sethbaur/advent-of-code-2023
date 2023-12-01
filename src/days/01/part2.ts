import { getData } from "../../shared";

const data = getData("01/input.txt");

const numberMap: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

export const match = (line: string): string[] => {
  const results = [];
  let match;

  while ((match = regex.exec(line)) != null) {
    results.push(match[0]);
    regex.lastIndex = match.index + 1;
  }
  return results;
};

export const sumCalibrations = (data: string[]) => {
  return data.map((line) => match(line))
    .reduce((sum: number, numbers: string[]) => {
      const firstNumber = numberMap[numbers[0]] ?? parseInt(numbers[0]);
      const secondNumber = numberMap[numbers[numbers.length - 1]] ?? parseInt(numbers[numbers.length - 1]);
      // console.log(firstNumber, secondNumber);
      return sum + parseInt(`${firstNumber}${secondNumber}`);
  }, 0);
};

export default sumCalibrations(data);

import { parseData, getData } from "./shared";

const testDataString = `
1
2
abc
5
`.trim();

describe("getting data from file", () => {
  test("parseData converts string to string[]", () => {
    expect(parseData(testDataString)).toEqual(["1", "2", "abc", "5"]);
  });

  test("getData converts file contents to string[]", () => {
    const data = getData("00/test_input.txt");
    expect(data).toEqual(["1000", "2000", "3000", "", "4000", "", "5000", "6000"]);
  });
});

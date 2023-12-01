import commandLineArgs from "command-line-args";
import days from "./days";

const optionDefs = [
  { name: "day", alias: "d", type: Number },
];

const options = commandLineArgs(optionDefs);

console.log(days[options.day - 1]);

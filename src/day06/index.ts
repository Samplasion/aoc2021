import run from "aocrunner";
import School from "./school.js";

const parseInput = (rawInput: string) => {
  return rawInput.split(",").map(Number);
};

const startSimulation = (rawInput: string, days: number) => {
  const input = parseInput(rawInput);
  const school = new School(input);

  school.simulate(days);

  return school.size;
};

run({
  part1: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 5934,
      },
    ],
    solution: input => startSimulation(input, 80),
  },
  part2: {
    tests: [
      {
        input: `3,4,3,1,2`,
        expected: 26984457539,
      },
    ],
    solution: input => startSimulation(input, 256),
  },
  trimTestInputs: true,
  onlyTests: false,
});

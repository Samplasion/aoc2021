import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let previous: number | null;
  let count = 0;

  input.forEach((current) => {
    if (previous === null || previous < current) {
      count++;
    }
    previous = current;
  });

  return count;
};

type Window = [number, number, number];
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const windows = [];

  for (let i = 0; i < input.length - 2; i++) {
    const window = [input[i], input[i + 1], input[i + 2]];
    windows.push(window);
  }

  let previous: number | null;
  let count = 0;

  windows.forEach((window) => {
    let sum = window[0] + window[1] + window[2];
    if (previous === null || previous < sum) {
      count++;
    }
    previous = sum;
  });

  return count;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

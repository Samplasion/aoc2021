import run from "aocrunner";

type Action = "forward" | "up" | "down";
type Input = `${Action} ${number}`

const parseInput = (rawInput: string) => {
  return rawInput.split("\n") as unknown as Input[];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let horizontal = 0;
  let depth = 0;

  input.forEach((input: Input) => {
    const action = input.split(" ")[0];
    const number = parseInt(input.split(" ")[1]);

    switch (action) {
      case "up":
        depth -= number;
        break;
      case "down":
        depth += number;
        break;
      case "forward":
        horizontal += number;
        break;
    }
  });

  return horizontal * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  input.forEach((input: Input) => {
    const action = input.split(" ")[0];
    const number = parseInt(input.split(" ")[1]);

    switch (action) {
      case "up":
        aim -= number;
        break;
      case "down":
        aim += number;
        break;
      case "forward":
        horizontal += number;
        depth += number * aim;
        break;
    }
  });

  return horizontal * depth;
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

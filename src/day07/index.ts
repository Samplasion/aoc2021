import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";

const parseInput = (rawInput: string) => {
  return rawInput.split(",").map(Number);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).sort((a, b) => a - b);
  let median = -1;
  if (input.length % 2 == 0) {
    const above = input[Math.ceil(input.length / 2)];
    const below = input[Math.floor(input.length / 2)];
    median = (above + below) / 2;
  } else {
    median = input[~~(input.length / 2)];
  }

  return input.reduce((acc, crab) => {
    return acc + Math.abs(crab - median);
  }, 0);
};

/** Calculates Σ(1...n) using Gauss' formula */
const bigS = (n: number): number => {
  return n * (n + 1) / 2;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const floorAvg = Math.floor(input.reduce((acc, crab) => acc + crab, 0) / input.length);
  const ceilAvg = Math.ceil(input.reduce((acc, crab) => acc + crab, 0) / input.length);

  const totalFuel = (target: number) => input.reduce((acc, crab) => {
    const fuel = bigS(Math.abs(crab - target));
    return acc + fuel;
  }, 0);

  if (floorAvg === ceilAvg)
    return totalFuel(floorAvg);


  return Math.min(totalFuel(floorAvg), totalFuel(ceilAvg));
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

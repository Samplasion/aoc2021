import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";

type Coordinate = [x: number, y: number];

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => line.split("").map(Number));
};

const getAdjacent = (x: number, y: number) => {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ];
};

const getStep = (input: number[][], flashed: Coordinate[]) => () => {
  if (flashed.length) {
    for (const [x, y] of flashed) {
      input[x][y] = 0;
    }
    flashed = [];
  }

  function flash(x: number, y: number) {
    if (input[x][y] >= 10 && !flashed.some(c => c[0] === x && c[1] === y)) {
      flashed.push([x, y]);

      for (const [nx, ny] of getAdjacent(x, y)) {
        if (input[nx]?.[ny] != undefined) {
          input[nx][ny]++;
          flash(nx, ny);
        }
      }
    }
  }

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      // Step 1: increase
      input[x][y]++;

      // Step 2: flash
      flash(x, y);
    }
  }

  return flashed;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let flashes = 0;
  let flashed: Coordinate[] = [];

  const step = getStep(input, flashed);

  for (let i = 0; i < 100; i++) {
    flashed = step();
    flashes += flashed.length;
  }

  return flashes;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let flashed: Coordinate[] = [];

  const step = getStep(input, flashed);

  for (let i = 1; ; i++) {
    if (step().length == 100)
      return i;
  }
};

const example = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.trim();

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

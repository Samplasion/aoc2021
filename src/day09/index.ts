import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(row => row.split("").map(Number));
};

const getLowPoints = (input: number[][]) => {
  const lowPoints = [];
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const up = input[x - 1]?.[y] ?? Infinity;
      const down = input[x + 1]?.[y] ?? Infinity;
      const left = input[x]?.[y - 1] ?? Infinity;
      const right = input[x]?.[y + 1] ?? Infinity;
      const value = input[x][y];
      if (value < Math.min(up, down, left, right)) {
        // Risk level
        lowPoints.push([x, y]);
      }
    }
  }

  return lowPoints;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getLowPoints(input).reduce((acc, [x, y]) => acc + input[x][y] + 1, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lowPoints = getLowPoints(input);
  const visited: boolean[][] = [];

  function getBasin(x: number, y: number) {
    if (!visited[x]) {
      visited[x] = [];
    }

    let sum = 1;

    visited[x][y] = true;

    const up = input[x - 1]?.[y] ?? Infinity;
    const down = input[x + 1]?.[y] ?? Infinity;
    const left = input[x]?.[y - 1] ?? Infinity;
    const right = input[x]?.[y + 1] ?? Infinity;

    if (up < 9 && !visited[x - 1]?.[y]) {
      sum += getBasin(x - 1, y);
    }
    if (down < 9 && !visited[x + 1]?.[y]) {
      sum += getBasin(x + 1, y);
    }
    if (left < 9 && !visited[x]?.[y - 1]) {
      sum += getBasin(x, y - 1);
    }
    if (right < 9 && !visited[x]?.[y + 1]) {
      sum += getBasin(x, y + 1);
    }

    return sum;
  }

  const basins = lowPoints.map(([x, y]) => getBasin(x, y));
  basins.sort((a, b) => b - a);

  return basins.slice(0, 3).reduce((acc, basin) => acc * basin, 1);
};

const example = `
2199943210
3987894921
9856789892
8767896789
9899965678`.trim();

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
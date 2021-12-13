import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";
import Grid from "./grid.ts";
import { toLetters } from "./letters.ts";

export enum FoldDirection {
  Up = "y",
  Left = "x",
}
export type Fold = [direction: FoldDirection, line: number]

const parseInput = (rawInput: string) => {
  const [dots, folds] = rawInput.split("\n\n").slice(0, 2);
  const parsedDots = dots.split("\n").map((row) => row.split(",").map(Number) as [number, number]);
  const width = parsedDots.reduce((max, row) => Math.max(max, row[0]), 0) + 1; // +1 because those are indices
  const height = parsedDots.reduce((max, row) => Math.max(max, row[1]), 0) + 1; // +1 because those are indices
  const grid: boolean[][] = new Array(height).fill(false).map((_) => new Array(width).fill(false));
  for (const [x, y] of parsedDots) {
    grid[y] = grid[y] ?? Array(width).fill(false);
    grid[y][x] = true;
  }
  const parsedFolds: Fold[] = [];
  for (const line of folds.trim().split("\n")) {
    const [direction, size] = line.replace("fold along ", "").split("=");
    parsedFolds.push([direction as FoldDirection, Number(size)]);
  }
  const firstFoldLeft = parsedFolds.find(([direction]) => direction === FoldDirection.Left);
  return [new Grid(grid, firstFoldLeft![1] * 2 + 1), parsedFolds] as const;
};

const part1 = (rawInput: string) => {
  let [grid, folds] = parseInput(rawInput);
  grid = grid.fold(folds[0]);

  return grid.dots;
};

const part2 = (rawInput: string) => {
  let [grid, folds] = parseInput(rawInput);

  for (const fold of folds) {
    grid = grid.fold(fold);
  }

  console.log(grid.toString(true), "\n");

  return toLetters(grid);
};

const example = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.trim();

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 17,
      },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  onlyTests: false,
});

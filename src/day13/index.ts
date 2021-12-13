import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";
import Grid from "./grid.ts";
import { toLetters } from "./letters.ts";
import CustomSet from "./set.ts";

export enum FoldDirection {
  Up = "y",
  Left = "x",
}
export type Fold = [direction: FoldDirection, line: number]

const parseInput = (rawInput: string) => {
  const [dots, folds] = rawInput.split("\n\n").slice(0, 2);
  const parsedDots = dots.split("\n").map((row) => row.split(",").map(Number) as [number, number]);
  
  const set = new CustomSet<[x: number, y: number]>();

  for (const dot of parsedDots) {
    set.add(dot);
  }

  const parsedFolds: Fold[] = [];
  for (const line of folds.trim().split("\n")) {
    const [direction, size] = line.replace("fold along ", "").split("=");
    parsedFolds.push([direction as FoldDirection, Number(size)]);
  }

  return [set, parsedFolds] as const;
};

function fold(set: CustomSet<[x: number, y: number]>, [direction, line]: Fold) {
  const newSet = new CustomSet<[x: number, y: number]>();
  for (const dot of set) {
    const [x, y] = dot;
    if (direction === FoldDirection.Up) {
      if (y > line) {
        const delta = 2 * (y - line);
        newSet.add([x, y - delta]);
      } else {
        newSet.add([x, y]);
      }
    } else {
      if (x > line) {
        const delta = 2 * (x - line);
        newSet.add([x - delta, y]);
      } else {
        newSet.add([x, y]);
      }
    }
  }
  return newSet;
}

function toGrid(set: CustomSet<[x: number, y: number]>) {
  const width = set.reduce((max, dot) => Math.max(max, dot[0]), 0) + 1;
  const height = set.reduce((max, dot) => Math.max(max, dot[1]), 0) + 1;
  const booleans = new Array(height).fill(false).map(() => new Array(width).fill(false));
  for (const dot of set) {
    booleans[dot[1]][dot[0]] = true;
  }
  return new Grid(booleans, width);
}

const part1 = (rawInput: string) => {
  const [grid, folds] = parseInput(rawInput);

  return fold(grid, folds[0]).size;
};

const part2 = (rawInput: string) => {
  let [grid, folds] = parseInput(rawInput);

  for (const foldObj of folds) {
    grid = fold(grid, foldObj);
  }

  return toLetters(toGrid(grid));
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

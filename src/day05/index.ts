import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";
import Grid from "./grid.ts";

type Point = [x: number, y: number];
type Vector = [start: Point, end: Point];

const parseInput = (rawInput: string) => {
  const straight: Vector[] = [];
  const diag: Vector[] = [];

  for (const line of rawInput.trim().split('\n')) {
    const [, x1, y1, x2, y2] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)!.map(Number);

    if (x1 !== x2 && y1 !== y2) {
      // Don't mess with diagonals
      diag.push([[x1, y1], [x2, y2]]);
    } else {
      // Normalize the vector
      const startX = Math.min(x1, x2);
      const startY = Math.min(y1, y2);
      const endX = Math.max(x1, x2);
      const endY = Math.max(y1, y2);

      straight.push([[startX, startY], [endX, endY]]);
    }

  }
  return [straight, diag];
};

const bothParts = (input: string) => {
  const [straight, diag] = parseInput(input);

  const size = [...straight, ...diag].reduce((max, [, [x2, y2]]) => Math.max(max, x2, y2), 0) + 1;
  const grid = new Grid(size, size);

  for (const [start, end] of straight.reverse()) {
    if (start[0] === end[0]) {
      // Vertical
      for (let y = start[1]; y <= end[1]; y++) {
        grid.set(start[0], y, grid.get(start[0], y) + 1);
      }
    } else if (start[1] === end[1]) {
      // Horizontal
      for (let x = start[0]; x <= end[0]; x++) {
        grid.set(x, start[1], grid.get(x, start[1]) + 1);
      }
    }
  }

  const part1 = grid.data.filter(x => x > 1).length;

  for (const [start, end] of diag) {
    // Diagonal (45 degrees)
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const length = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / length;
    const yInc = dy / length;
    for (let i = 0; i <= length; i++) {
      const pointX = start[0] + i * xInc;
      const pointY = start[1] + i * yInc;
      grid.set(pointX, pointY, grid.get(pointX, pointY) + 1);
    }
  }

  const part2 = grid.data.filter(x => x > 1).length;

  return [part1, part2];
};

run({
  part1: {
    solution: input => bothParts(input)[0],
  },
  part2: {
    solution: input => bothParts(input)[1],
  },
  trimTestInputs: true,
  onlyTests: false,
});

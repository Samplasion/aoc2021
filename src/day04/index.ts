import run from "aocrunner";
import Board from "./board.js";

const parseInput = (rawInput: string) => {
  const numbers: number[] = rawInput.split("\n\n")[0].split(",").map(Number);
  const boards: Board[] = rawInput.split("\n\n").slice(1).map(line => Board.fromString(line));

  return [numbers, boards] as const;
};

const bothParts = (rawInput: string) => {
  const [numbers, boards] = parseInput(rawInput);

  const scores: number[] = [];
  numbers.forEach((number) => {
    boards.filter(board => !board.hasWon).forEach((board) => {
      board.add(number);
      if (board.checkBingo()) {
        scores.push(board.score);
      }
    });
  });

  return [
    scores[0],
    scores[scores.length - 1],
  ];
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

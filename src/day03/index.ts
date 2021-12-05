import run from "aocrunner";
import Bitset from "./bitset.js";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    return Bitset.fromString(line);
  });
};

const mostCommon = (bitsets: Bitset[]) => {
  const bits = bitsets[0].size;
  const result = new Bitset(bits);

  for (let i = 0; i < bits; i++) {
    let zeros = 0;
    let ones = 0;

    bitsets.forEach(bitset => {
      if (bitset.get(i)) {
        ones++;
      } else {
        zeros++;
      }
    });

    if (zeros > ones) {
      result.set(i, false);
    } else {
      result.set(i, true);
    }
  }

  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const base = mostCommon(input);

  const gamma = base.toInt();
  const epsilon = base.flip().toInt();

  return gamma * epsilon;
};

const bitCriteria = (bitsets: Bitset[], complement: number, position: number): Bitset => {
  if (bitsets.length == 1) {
    return bitsets[0];
  }

  const target = +mostCommon(bitsets).get(position) ^ complement;
  const res = bitsets.filter(bitset => {
    return +bitset.get(position) == target;
  });
  return bitCriteria(res, complement, position + 1);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const base = mostCommon(input);

  const oxy = bitCriteria(input, 0, 0);
  const co2 = bitCriteria(input, 1, 0);

  return oxy.toInt() * co2.toInt();
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

import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";
import print from "./print.ts";
import sevenSegment from "./sevensegment.ts";

type Input = [input: string[], output: string[]][];

// Explanation for digit groups: https://docs.google.com/spreadsheets/d/1U_tBsShi6tGHjMuMFc9h0KeTiqPcDLVV3C6U3p_RpSE/
// Source: https://www.reddit.com/r/adventofcode/comments/rbj87a/c/hnpsjpw/
const digitGroups = ["312", "200", "212", "311", "220", "221", "222", "300", "322", "321"];

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => line.split(" | ").map(io => io.split(" "))) as Input;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const unique = ([1, 4, 7, 8] as const).map(digit => sevenSegment[digit].length);

  const res = input.reduce((acc, [_, output]) => {
    return acc + output.filter(word => unique.includes(word.length)).length;
  }, 0);

  print(res);
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const unscrambleInput = ([input, output]: Input[number]) => {
    const groups: string[] = [];
    groups.push([...input, ...output].find(p => p.length == 3)!);
    groups.push([...input, ...output].find(p => p.length == 4)!.split('').filter(c => !groups[0].includes(c)).join(''));
    groups.push("abcdefg".split('').filter(c => !groups.join('').includes(c)).join(''));

    const decodeDigit = (encodedDigit: string) => {
      var groupCode = new Array(3).fill(0);
      [...encodedDigit].forEach(char => {
        groupCode[groups.findIndex(g => g.includes(char))]++;
      });
      return digitGroups.findIndex(_ => _ === groupCode.join(""));
    }

    return parseInt(output.map(encodedDigit => decodeDigit(encodedDigit)).join(''));
  };

  const res = input.map(unscrambleInput).reduce((acc, curr) => acc + curr, 0);

  print(res);
  return res;
};

const example = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`.trim();

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  onlyTests: false,
});

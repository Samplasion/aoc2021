import run from "aocrunner";

type OpeningCharacter = "(" | "[" | "{" | "<";
type ClosingCharacter = ")" | "]" | "}" | ">";
type Character = OpeningCharacter | ClosingCharacter;

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(line => line.split("")) as Character[][];
};

const isSame = (a: Character, b: Character) => {
  switch (a) {
    case "(":
      return b === ")";
    case "[":
      return b === "]";
    case "{":
      return b === "}";
    case "<":
      return b === ">";
    case ")":
      return b === "(";
    case "]":
      return b === "[";
    case "}":
      return b === "{";
    case ">":
      return b === "<";
    default:
      return false;
  }
};

const getScore = (char: Character) => {
  switch (char) {
    case "(":
    case ")":
      return 3;
    case "[":
    case "]":
      return 57;
    case "{":
    case "}":
      return 1197;
    case "<":
    case ">":
      return 25137;
  }
}

const getClosingCharacter = (openingCharacter: OpeningCharacter) => {
  switch (openingCharacter) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
  }
}

const isInvalid = (line: Character[]): [boolean, Character | null, Character[]] => {
  const stack: Character[] = [];
  for (const char of line) {
    if (char === "(" || char === "[" || char === "{" || char === "<") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}" || char === ">") {
      if (isSame(char, stack[stack.length - 1])) {
        if (stack.length === 0) {
          return [true, char, stack];
        }
        const top = stack.pop()!;
        if (
          (char === ")" && top !== "(") ||
          (char === "]" && top !== "[") ||
          (char === "}" && top !== "{") ||
          (char === ">" && top !== "<")
        ) {
          return [true, char, stack];
        }
      } else {
        return [true, char, stack];
      }
    }
  }

  return [false, null, stack];
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let score = 0;

  for (const line of input) {
    const [isInvalidLine, lastChar] = isInvalid(line);
    if (isInvalidLine) {
      const charScore = getScore(lastChar!) ?? 0;
      score += charScore;
    }
  }

  return score;
};

const getPart2Score = (character: Character) => {
  switch (character) {
    case "(":
    case ")":
      return 1;
    case "[":
    case "]":
      return 2;
    case "{":
    case "}":
      return 3;
    case "<":
    case ">":
      return 4;
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const scores = input.map(line => isInvalid(line)).map(([isInvalid, _, stack]) => {
    if (isInvalid)
      return;

    let score = 0;
    let completionString = "";
    stack.reverse().forEach(char => {
      completionString += getClosingCharacter(char as OpeningCharacter);
    });

    for (const char of completionString) {
      score *= 5;
      score += getPart2Score(char as Character);
    }

    return score;
  }).filter(Boolean).sort((a, b) => a! - b!);

  return scores[~~(scores.length / 2)];
};

const example = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.trim();

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  onlyTests: false,
});
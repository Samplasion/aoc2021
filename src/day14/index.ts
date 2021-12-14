import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";

type Character = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type Reaction = [reactants: `${Character}${Character}`, result: Character];

const parseInput = (rawInput: string) => {
  const [template, rawReplacements] = rawInput.trim().split("\n\n");

  const reactions = rawReplacements.split("\n").map((rawReaction) => {
    const [reactants, result] = rawReaction.split(" -> ");
    return [reactants, result] as Reaction;
  });

  return {
    template,
    reactions,
  };
};

// Naive solution
const part1 = (rawInput: string) => {
  const { template, reactions } = parseInput(rawInput);
  let polymer = template;

  for (let i = 0; i < 10; i++) {
    let temp = "";
    // Sliding window of length 2
    for (let j = 0; j < polymer.length - 1; j++) {
      const reactants = polymer[j] + polymer[j + 1];
      const reaction = reactions.find(([reactant]) => reactant === reactants)!;
      temp += reactants[0] + reaction[1];
    }
    polymer = temp + polymer[polymer.length - 1];
  }

  const occurrences = {} as { [key in Character]: number };
  for (let i = 0; i < polymer.length; i++) {
    const char = polymer[i] as keyof typeof occurrences;
    if (char in occurrences) {
      occurrences[char]++;
    } else {
      occurrences[char] = 1;
    }
  }

  const mostCommon = Object.values(occurrences).sort((a, b) => b - a)[0];
  const leastCommon = Object.values(occurrences).sort((a, b) => a - b)[0];

  return mostCommon - leastCommon;
};

// Smart solution
const part2 = (rawInput: string) => {
  const { template, reactions } = parseInput(rawInput);
  let occurrences = {} as { [key in Reaction[0]]?: number };

  // Split the polymer into reactants
  for (let j = 0; j < template.length - 1; j++) {
    const reactants = template[j] + template[j + 1] as Reaction[0];
    occurrences[reactants] ??= 0;
    occurrences[reactants]!++;
  }
  
  // Apply 40 steps of reaction
  for (let i = 0; i < 40; i++) {
    const newOccurrences = {...occurrences};
    for (const [reactants, val] of Object.entries(occurrences)) {
      const reaction = reactions.find(([reactant]) => reactant === reactants)!;
      const [a, b] = [`${reactants[0]}${reaction[1]}`, `${reaction[1]}${reactants[1]}`] as [Reaction[0], Reaction[0]];
      newOccurrences[a] ??= 0;
      newOccurrences[a]! += val;
      newOccurrences[b] ??= 0;
      newOccurrences[b]! += val;
      newOccurrences[reactants as Reaction[0]] = Math.max(0, newOccurrences[reactants as Reaction[0]]! - val);
    }
    occurrences = newOccurrences;
  }

  // Rebuild the atoms
  const atoms = {
    [template[0]]: 1,
    [template[template.length-1]]: 1,
  } as { [key in Character]: number };
  for (const reactants of Object.keys(occurrences)) {
    atoms[reactants[0] as Character] ??= 0;
    atoms[reactants[0] as Character] += occurrences[reactants as Reaction[0]]!;
    atoms[reactants[1] as Character] ??= 0;
    atoms[reactants[1] as Character] += occurrences[reactants as Reaction[0]]!;
  }

  const mostCommon = Object.values(atoms).sort((a, b) => b - a)[0];
  const leastCommon = Object.values(atoms).sort((a, b) => a - b)[0];

  return (mostCommon - leastCommon) / 2;
};

const example = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 2188189693529,
      },
    ],
    solution: part2,
  },
  onlyTests: false,
});

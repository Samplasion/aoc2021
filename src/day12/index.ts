import run from "https://deno.land/x/aoc@0.0.1-alpha.9/mod.ts";

// type Node = string;
type CavePair = [Node, Node];
type Edges = Record<string, Set<Node>>;

class Node {
  name: string;
  paths: string[];
  visited = 0;
  
  constructor(name: string) {
    this.name = name;
    this.paths = [];
  }

  addPath(node: Node) {
    if (this.paths.some(n => n == node.name)) return;
    this.paths.push(node.name);
  }

  visit() {
    this.visited++;
  }

  unvisit() {
    this.visited = Math.max(0, this.visited - 1);
  }

  get wasVisited() {
    return this.visited > 0;
  }

  get isLarge() {
    return this.name[0].toUpperCase() == this.name[0];
  }

  get isEnd() {
    return this.name == "end";
  }
}

const parseInput = (rawInput: string, part2 = false) => {
  const input = new Map<string, Node>();

  for (const line of rawInput.trim().split("\n")) {
    const [from, to] = line.split("-");
    const fromNode = input.get(from) || new Node(from);
    const toNode = input.get(to) || new Node(to);
    if (toNode.name != "start" && fromNode.name != "end" && !part2) {
      fromNode.addPath(toNode);
    }
    if (fromNode.name != "start" && toNode.name != "end" && !part2) {
      toNode.addPath(fromNode);
    }
    input.set(from, fromNode);
    input.set(to, toNode);
  }

  return input;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let current = input.get("start")!;

  const paths = new Set<string>();
  function recurse(node: Node, subpath: Array<string>) {
    node.paths.forEach(n => {
      const subnode = input.get(n)!;
      if (subpath.includes(n) && !subnode.isLarge) {
        return;
      }
      recurse(subnode, [...subpath, n]);
    });
    if (node.isEnd)
      paths.add(subpath.join(","));
  }
  
  recurse(current, [current.name]);

  return paths.size;
};

function hasDoubleNodes(array: string[]): boolean {
  var smallNodes = array.filter((n) => n[0].toUpperCase() != n[0]);
  return smallNodes.length > new Set(smallNodes).size;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let paths = [[]] as string[][];
  
  while (paths.some(path => !path.includes('end'))) {
    const innerPaths: string[][] = [];

    for (const path of paths) {
      if (path.includes('end')) {
        innerPaths.push(path);
        continue;
      }

      const node = input.get(path[path.length - 1] ?? "start")!;
      node.paths.filter(n => n != "start").forEach(n => {
        const subnode = input.get(n)!;
        if (!path.includes(n) || subnode.isLarge || !hasDoubleNodes(path)) {
          innerPaths.push([...path, n]);
        }
      });
    }

    paths = innerPaths;
  }

  return paths.length;
};

const example = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end`.trim()

const slightlyLarger = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.trim()

const evenLarger = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.trim()

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 10,
      },
      {
        input: slightlyLarger,
        expected: 19,
      },
      {
        input: evenLarger,
        expected: 226,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 36,
      },
      {
        input: slightlyLarger,
        expected: 103,
      },
      {
        input: evenLarger,
        expected: 3509,
      },
    ],
    solution: part2,
  },
  onlyTests: false,
});

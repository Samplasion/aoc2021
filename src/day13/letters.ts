import Grid from "./grid.ts";

const lettersBySymbol = {
    A: [
        ".##.",
        "#..#",
        "#..#",
        "####",
        "#..#",
        "#..#",
    ],
    B: [
        "###.",
        "#..#",
        "###.",
        "#..#",
        "#..#",
        "###.",
    ],
    C: [
        ".##.",
        "#..#",
        "#...",
        "#...",
        "#..#",
        ".##.",
    ],
    E: [
        "####",
        "#...",
        "###.",
        "#...",
        "#...",
        "####",
    ],
    F: [
        "####",
        "#...",
        "###.",
        "#...",
        "#...",
        "#...",
    ],
    G: [
        ".##.",
        "#..#",
        "#...",
        "#.##",
        "#..#",
        ".###",
    ],
    H: [
        "#..#",
        "#..#",
        "####",
        "#..#",
        "#..#",
        "#..#",
    ],
    J: [
        "..##",
        "...#",
        "...#",
        "...#",
        "#..#",
        ".##.",
    ],
    K: [
        "#..#",
        "#.#.",
        "##..",
        "#.#.",
        "#.#.",
        "#..#",
    ],
    L: [
        "#...",
        "#...",
        "#...",
        "#...",
        "#...",
        "####",
    ],
    P: [
        "###.",
        "#..#",
        "#..#",
        "###.",
        "#...",
        "#...",
    ],
    R: [
        "###.",
        "#..#",
        "#..#",
        "###.",
        "#.#.",
        "#..#",
    ],
    U: [
        "#..#",
        "#..#",
        "#..#",
        "#..#",
        "#..#",
        ".##.",
    ],
    Z: [
        "####",
        "...#",
        "..#.",
        ".#..",
        "#...",
        "####",
    ],
}
export default lettersBySymbol;

export function toLetters(grid: Grid): string {
    const letters: string[] = []
    for (let x = 0; x < grid.width; x += 5) {
        let candidates = Object.keys(lettersBySymbol) as (keyof typeof lettersBySymbol)[];
        for (let y = 0; y < grid.height; y++) {
            const [a, b, c, d] = grid.data[y].slice(x, x + 4).map(x => x ? "#" : ".");
            const str = `${a}${b}${c}${d}`;
            candidates = candidates.filter(c => lettersBySymbol[c][y] == str);
        }
        letters.push(candidates[0]);
    }
    return letters.join("");
}
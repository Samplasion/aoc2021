import sevenSegment from "./sevensegment.js";

const blueprint = ` aaaa 
b    c
b    c
 dddd 
e    f
e    f
 gggg `;

export default function print(input: number): void {
    function makeDigit(digit: number) {
        return blueprint.replace(/[abcdefg]/g, (match) => {
            const ssd = sevenSegment[digit as keyof typeof sevenSegment];
            if (ssd.includes(match)) {
                // text in green
                return `\x1b[32m▓\x1b[0m`;
            } else {
                return `\x1b[2m.\x1b[0m`;
            }
        });
    }

    const digits = input.toString().split("").map(Number);
    const numbers = digits.map(makeDigit).map((d) => d.split("\n"));

    for (let i = 0; i < 7; i++) {
        console.log(numbers.map(n => n[i]).join("  "));
    }

    // console.log(joined.join(" "));
}
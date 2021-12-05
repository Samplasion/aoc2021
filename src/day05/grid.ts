export default class Grid {
    data: number[];
    width: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.data = Array(width * height).fill(0);
    }

    get(x: number, y: number): number {
        return this.data[y * this.width + x];
    }

    set(x: number, y: number, value: number): void {
        this.data[y * this.width + x] = value;
    }

    getRow(y: number): number[] {
        return this.data.slice(y * this.width, (y + 1) * this.width);
    }

    toString(vals = 10): string {
        let res = '[\n\t';
        for (let y = 0; y < Math.min(this.width, vals); y++) {
            res += this.getRow(y).slice(0, vals).join(', ');
            if (y < this.width - 1) {
                res += ',\n\t';
            }
        }
        res += '\n]';
        return res;
    }
}
export default class Bitset {
    private bits: number[] = [];

    constructor(size: number) {
        this.bits = new Array(size).fill(0);
    }

    static from(num: number): Bitset {
        return Bitset.fromString(num.toString(2));
    }

    static fromString(str: string): Bitset {
        const bitset = new Bitset(str.length);
        for (let i = 0; i < str.length; i++) {
            bitset.set(i, str[i] === '1');
        }
        return bitset;
    }

    public toString(): string {
        return this.bits.map(bit => `${bit}`).join('');
    }

    public toInt(): number {
        return parseInt(this.toString(), 2);
    }

    public flip(): Bitset {
        const bitset = new Bitset(this.size);
        for (let i = 0; i < this.size; i++) {
            bitset.set(i, !this.get(i));
        }
        return bitset;
    }

    public xor(other: Bitset): Bitset {
        const bitset = new Bitset(this.size);
        for (let i = 0; i < this.size; i++) {
            bitset.set(i, this.get(i) !== other.get(i));
        }
        return bitset;
    }

    public set(index: number, value: boolean) {
        this.bits[index] = +value;
    }

    public get(index: number): boolean {
        return this.bits[index] === 1;
    }

    public get size(): number {
        return this.bits.length;
    }
}
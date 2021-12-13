export default class CustomSet<T> {
    private items: T[] = [];
    private length = 0;

    constructor(items?: Iterable<T>) {
        if (items) {
            for (const item of items) {
                this.add(item);
            }
        }
    }

    /**
     * Adds an item to the set.
     * This operation is O(n).
     */
    public add(item: T): void {
        if (!this.has(item)) {
            this.length = this.items.push(item);
        }
    }

    /**
     * Returns true if the set contains the item.
     * This operation is O(n).
     */
    has(item: T): boolean {
        for (const i of this.items) {
            if (this.isEqual(i, item)) {
                return true;
            }
        }
        return false;
    }

    private isEqual(t1: T, t2: T): boolean {
        if (typeof t1 != typeof t2) {
            return false;
        }

        if (Array.isArray(t1) && Array.isArray(t2)) {
            return t1.every((v, i) => v === t2[i]);
        }

        return t1 === t2;
    }

    /**
     * Deletes an item from the set.
     * This operation is O(n).
     */
    delete(item: T): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                this.items.splice(i, 1);
                this.length--;
                return;
            }
        }
    }

    /**
     * Deletes every item in the set that conforms to the predicate.
     * This operation is O(n).
     */
    deleteWhere(predicate: (item: T) => boolean): void {
        for (let i = 0; i < this.items.length; i++) {
            if (predicate(this.items[i])) {
                this.items.splice(i, 1);
                i--;
                this.length--;
            }
        }
    }

    [Symbol.iterator](): Iterator<T> {
        return this.items[Symbol.iterator]();
    }

    /**
     * Returns the number of items in the set.
     * This operation is O(1).
     */
    get size(): number {
        return this.length;
    }

    values() {
        return this[Symbol.iterator]();
    }

    find(predicate: (item: T) => boolean): T | undefined {
        for (const item of this.items) {
            if (predicate(item)) {
                return item;
            }
        }
    }

    reduce<U>(
        reducer: (accumulator: U, item: T) => U,
        initialValue: U
    ): U {
        return this.items.reduce(reducer, initialValue);
    }
}
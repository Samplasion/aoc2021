export default class Board {
    board: number[][];
    marked: number[] = [];
    hasWon = false;

    private constructor(board: number[][]) {
        this.board = board;
    }

    static fromString(input: string): Board {
        let lines = input.split('\n');
        let board: number[][] = [];
        for (let line of lines) {
            var row = line.trim().split(/\s+/).map(Number);
            board.push(row);
        }
        return new Board(board);
    }

    add(number: number): boolean {
        if (this.board.some((row) => row.includes(number))) {
            this.marked.push(number);
            return true;
        }
        return false;
    }

    checkBingo(): boolean {
        // Check vertical
        for (var i = 0; i < 5; i++) {
            if (this.board[i].every((n) => this.marked.includes(n))) {
                this.hasWon = true;
                return true;
            }
        }

        // Check horizontal
        for (var i = 0; i < 5; i++) {
            var row = this.board.map((row) => row[i]);
            if (row.every((n) => this.marked.includes(n))) {
                this.hasWon = true;
                return true;
            }
        }

        return false;
    }

    get allNumbers(): number[] {
        return this.board.reduce((acc, row) => acc.concat(row), []);
    }

    get score(): number {
        return this.allNumbers.reduce((score, element) => {
            if (this.marked.includes(element)) {
                return score;
            }
            return score + element;
        }, 0) * this.marked[this.marked.length - 1];
    }

    clone(): Board {
        return new Board(this.board.map((row) => [...row]));
    }
}
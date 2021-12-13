import { colors } from "../deps.ts";
import { Fold, FoldDirection } from "./index.ts";

export default class Grid {
  private grid: boolean[][] = [];
  
  public get data() {return this.grid;}
  public width: number;
  public height: number;

  constructor(grid: boolean[][], width: number) {
    this.height = grid.length;
    this.width = width;
    this.grid = grid.map((row) => {
      row.length = this.width;
      return row.map((x) => x ?? false);
    });
  }

  public fold([direction, foldLine]: Fold): Grid {
    switch (direction) {
      case FoldDirection.Left: {
        const newGrid: boolean[][] = [];
        for (let y = 0; y < this.height; y++) {
          const row = [];

          for (let dx = -foldLine; dx < 0; dx++) {
            const x = foldLine + dx;
            const sx = foldLine - dx;
            const element = this.grid[y]?.[x] || this.grid[y]?.[sx] || false;
            row.push(element);
          }

          newGrid.push(row);
        }

        return new Grid(newGrid, foldLine);
      }
      case FoldDirection.Up: {
        const newGrid: boolean[][] = [];
        for (let dy = -foldLine; dy < 0; dy++) {
          const y = foldLine + dy;
          const sy = foldLine - dy;

          const row = [];

          for (let x = 0; x < this.width; x++) {
            const element = this.grid[y]?.[x] || this.grid[sy]?.[x] || false;
            row.push(element);
          }

          newGrid.push(row);
        }
        return new Grid(newGrid, this.width);
      }
    }
  }

  get dots(): number {
    return this.grid.reduce((sum, row) => sum + row.filter((x) => x).length, 0);
  }

  public toString(pretty = false, fold?: Fold): string {
    const chars = pretty ? ["█", " "] : ["#", "."];
    return this.grid.map((row, i) => {
      if (fold?.[0] === FoldDirection.Up && fold[1] == i) {
        return row.map((_) => colors.red("-")).join("");
      }
      return row.map((x, j) => {
        if (fold?.[0] === FoldDirection.Left && fold[1] == j) {
          return colors.red("|");
        }
        return x ? colors.green(chars[0]) : colors.gray(chars[1]);
      }).join("")
    }).join("\n");
  }
}
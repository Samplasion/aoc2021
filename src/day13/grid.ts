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
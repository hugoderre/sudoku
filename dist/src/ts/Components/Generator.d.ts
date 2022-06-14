import Grid from './Grid';
export default class Generator {
    grid: Grid;
    difficulty: string;
    gridValues: number[][];
    constructor(grid: Grid, difficulty: string);
    generateValues(): any[];
    getBaseGrid(): number[][];
    shuffleDigits(): void;
    shuffleRows(range: number[]): void;
    shuffleColumns(range: number[]): void;
    hideSomeCellsInGroups(): void;
}

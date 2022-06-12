export default class Generator {
    constructor(grid: any, difficulty: any);
    generateValues(): any;
    getBaseGrid(): number[][];
    shuffleDigits(): void;
    shuffleRows(range: any): void;
    shuffleColumns(range: any): void;
    hideSomeCellsInGroups(): void;
}

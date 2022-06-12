export default class GameController {
    constructor(grid: any, gameUI: any);
    initEventListeners(): void;
    newGame(): void;
    verifyValues(): void;
    handlePadNumber(e: any): void;
    handleCellErase(): void;
    handleCellTip(): void;
    handleUserKeyInputs(e: any): void;
    handleMaybeSolvedGrid(): void;
    gameWon(): void;
}

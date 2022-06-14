import GameUI from "./GameUI";
import Grid from "./Grid";
export default class GameController {
    grid: Grid;
    gameUI: GameUI;
    constructor(grid: Grid, gameUI: GameUI);
    initEventListeners(): void;
    newGame(): void;
    verifyValues(): void;
    handlePadNumber(e: Event): void;
    handleCellErase(): void;
    handleCellTip(): void;
    handleUserKeyInputs(e: KeyboardEvent): void;
    handleMaybeSolvedGrid(): void;
    gameWon(): void;
}

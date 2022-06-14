import Grid from './Grid';
import Timer from './Timer';
export default class GameUI {
    grid: Grid;
    timer: Timer;
    constructor(grid: Grid);
    getTopElements(): HTMLDivElement;
    getButtonsElements(): HTMLDivElement;
    getNewGameButton(): HTMLButtonElement;
    getDifficultySelector(): HTMLSelectElement;
    getDifficultyOption(difficulty: string, selected?: boolean): HTMLOptionElement;
    getUserDifficulty(): string;
    getVerifyButton(): HTMLButtonElement;
    getBottomElements(): HTMLDivElement;
    getPadNumbers(): HTMLDivElement;
    getPadNumber(number: number): HTMLDivElement;
    getGridCellActionsButtons(): HTMLDivElement;
    getCellEraseButton(): HTMLDivElement;
    getCellTipButton(): HTMLDivElement;
}

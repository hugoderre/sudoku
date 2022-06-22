import Grid from './Grid';
import Timer from './Timer';
export default class GameUI {
    grid: Grid;
    timer: Timer;
    constructor(grid: Grid);
    getTopElements(): HTMLElement;
    getButtonsElements(): HTMLElement;
    getNewGameButton(): HTMLButtonElement;
    getDifficultySelector(): HTMLSelectElement;
    getDifficultyOption(difficulty: string, selected?: boolean): HTMLOptionElement;
    getUserDifficulty(): string;
    getVerifyButton(): HTMLButtonElement;
    getBottomElements(): HTMLElement;
    getPadNumbers(): HTMLElement;
    getPadNumber(number: number): HTMLElement;
    getGridCellActionsButtons(): HTMLElement;
    getCellEraseButton(): HTMLElement;
    getCellTipButton(): HTMLElement;
}

export default class GameUI {
    constructor(grid: any);
    getTopElements(): HTMLDivElement;
    getButtonsElements(): HTMLDivElement;
    getNewGameButton(): HTMLButtonElement;
    getDifficultySelector(): HTMLSelectElement;
    getDifficultyOption(difficulty: any, selected?: boolean): HTMLOptionElement;
    getUserDifficulty(): any;
    getVerifyButton(): HTMLButtonElement;
    getBottomElements(): HTMLDivElement;
    getPadNumbers(): HTMLDivElement;
    getPadNumber(number: any): HTMLDivElement;
    getGridCellActionsButtons(): HTMLDivElement;
    getCellEraseButton(): HTMLDivElement;
    getCellTipButton(): HTMLDivElement;
}

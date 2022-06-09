import Timer from './Timer.js';
import WinModal from './WinModal.js';

export default class GameUI {
    constructor( grid ) {
        this.grid = grid
        this.timer = new Timer()
        this.winModal = new WinModal( this.timer )
    }

    getWinModal() {
        return this.winModal.getModal()
    }

    getTopElements() {
        const elements = document.createElement( 'div' )
        elements.id = 'game-ui-top'
        elements.append( this.getButtonsElements() )
        elements.append( this.timer.getTimer() )
        return elements
    }

    getButtonsElements() {
        const elements = document.createElement( 'div' )
        elements.id = 'game-ui-buttons'
        elements.append( this.getNewGameButton() )
        elements.append( this.getDifficultySelector() )
        elements.append( this.getVerifyButton() )
        return elements
    }

    getNewGameButton() {
        const newGameButton = document.createElement( 'button' )
        newGameButton.id = 'new-game'
        newGameButton.innerText = 'New Game'
        return newGameButton
    }

    getDifficultySelector() {
        const difficultySelector = document.createElement( 'select' )
        difficultySelector.id = 'difficulty-selector'
        difficultySelector.append( this.getDifficultyOption( 'easy', true ) )
        difficultySelector.append( this.getDifficultyOption( 'medium' ) )
        difficultySelector.append( this.getDifficultyOption( 'hard' ) )
        return difficultySelector
    }

    getDifficultyOption( difficulty, selected = false ) {
        const difficultyOption = document.createElement( 'option' )
        difficultyOption.value = difficulty
        difficultyOption.innerText = difficulty.charAt( 0 ).toUpperCase() + difficulty.slice( 1 );
        difficultyOption.selected = selected
        return difficultyOption
    }

    getUserDifficulty() {
        return document.getElementById( 'difficulty-selector' ).value
    }

    getVerifyButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'verify'
        checkButton.innerText = 'Verify'
        return checkButton
    }

    getBottomElements() {
        const elements = document.createElement( 'div' )
        elements.id = 'game-ui-bottom'
        elements.append( this.getPadNumbers() )
        elements.append( this.getGridCellActionsButtons() )
        return elements
    }

    getPadNumbers() {
        const padNumbers = document.createElement( 'div' )
        padNumbers.id = 'pad-numbers'
        for ( let number = 1; number <= 9; number++ ) {
            padNumbers.append( this.getPadNumber( number ) )
        }
        return padNumbers
    }

    getPadNumber( number ) {
        const padNumber = document.createElement( 'div' )
        padNumber.classList.add( 'pad-number' )
        const padNumberSpan = document.createElement( 'span' )
        padNumberSpan.innerText = number
        padNumber.append( padNumberSpan )
        return padNumber
    }

    getGridCellActionsButtons() {
        const elements = document.createElement( 'div' )
        elements.id = 'grid-actions-buttons'
        elements.append( this.getCellEraseButton() )
        elements.append( this.getCellTipButton() )
        return elements
    }

    getCellEraseButton() {
        const cellEraseButton = document.createElement( 'div' )
        cellEraseButton.id = 'cell-erase'
        const cellEraseButtonSpan = document.createElement( 'span' )
        cellEraseButtonSpan.innerHTML = '<i class="fa-solid fa-eraser"></i>'
        cellEraseButton.append( cellEraseButtonSpan )
        return cellEraseButton
    }

    getCellTipButton() {
        const tipCellButton = document.createElement( 'div' )
        tipCellButton.id = 'cell-tip'
        const tipCellButtonSpan = document.createElement( 'span' )
        tipCellButtonSpan.innerHTML = '<i class="fa-solid fa-lightbulb"></i>'
        tipCellButton.append( tipCellButtonSpan )
        return tipCellButton
    }
}
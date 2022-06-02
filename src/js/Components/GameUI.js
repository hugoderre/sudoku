import Timer from './Timer.js';

export default class GameUI {
    constructor( grid ) {
        this.grid = grid
    }

    showWinMessage( time ) {
        console.log( 'You Win! Time: ' + time )
    }

    getTopElements() {
        const elements = document.createElement( 'div' )
        elements.id = 'game-ui-top'
        this.timer = new Timer()
        elements.append( this.timer.getTimer() )
        return elements
    }

    getBottomElements() {
        const elements = document.createElement( 'div' )
        elements.id = 'game-ui-bottom'
        elements.append( this.getNewGameButton() )
        elements.append( this.getDifficultySelector() )
        elements.append( this.getVerifyButton() )
        return elements
    }

    getNewGameButton() {
        this.newGameButton = document.createElement( 'button' )
        this.newGameButton.id = 'new-game'
        this.newGameButton.innerText = 'New Game'
        return this.newGameButton
    }

    getDifficultySelector() {
        this.difficultySelector = document.createElement( 'select' )
        this.difficultySelector.id = 'difficulty-selector'
        this.difficultySelector.append( this.getDifficultyOption( 'easy', true ) )
        this.difficultySelector.append( this.getDifficultyOption( 'medium' ) )
        this.difficultySelector.append( this.getDifficultyOption( 'hard' ) )
        this.difficultySelector.append( this.getDifficultyOption( 'show-all' ) )
        return this.difficultySelector
    }

    getDifficultyOption( difficulty, selected = false ) {
        this.difficultyOption = document.createElement( 'option' )
        this.difficultyOption.value = difficulty
        this.difficultyOption.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        this.difficultyOption.selected = selected
        return this.difficultyOption
    }

    getUserDifficulty() {
        return document.getElementById( 'difficulty-selector' ).value
    }

    getVerifyButton() {
        this.checkButton = document.createElement( 'button' )
        this.checkButton.id = 'verify'
        this.checkButton.innerText = 'Verify'
        return this.checkButton
    }
}
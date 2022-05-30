export default class GameUI {
    constructor( grid ) {
        this.grid = grid
    }

    getElements() {
        const gameButtons = document.createElement( 'div' )
        gameButtons.id = 'game-ui'
        gameButtons.append( this.getNewGameButton() )
        gameButtons.append( this.getDifficultySelector() )
        gameButtons.append( this.getVerifyButton() )
        return gameButtons
    }

    getNewGameButton() {
        const newGameButton = document.createElement( 'button' )
        newGameButton.id = 'new-game'
        newGameButton.innerText = 'New Game'
        newGameButton.addEventListener( 'click', this.grid.startGame.bind( this.grid ) )
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
        difficultyOption.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        difficultyOption.selected = selected
        return difficultyOption
    }

    static getUserDifficulty() {
        return document.getElementById( 'difficulty-selector' ).value
    }

    getVerifyButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'verify'
        checkButton.innerText = 'Verify'
        checkButton.addEventListener( 'click', this.grid.verifyValues.bind( this.grid ) )
        return checkButton
    }
}
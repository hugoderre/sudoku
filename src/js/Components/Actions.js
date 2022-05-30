export default class Actions {
    constructor( grid ) {
        this.grid = grid
    }

    getGameButtons() {
        const gameButtons = document.createElement( 'div' )
        gameButtons.id = 'game-buttons'
        gameButtons.append( this.getNewGameButton() )
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

    getVerifyButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'verify'
        checkButton.innerText = 'Verify'
        checkButton.addEventListener( 'click', this.grid.verifyValues.bind( this.grid ) )
        return checkButton
    }
}
export default class Actions {
    constructor( board ) {
        this.board = board
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
        newGameButton.addEventListener( 'click', this.board.startGame.bind( this.board ) )
        return newGameButton
    }

    getVerifyButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'verify'
        checkButton.innerText = 'Verify'
        checkButton.addEventListener( 'click', this.board.verifyValues.bind( this.board ) )
        return checkButton
    }
}
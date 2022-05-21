export default class Actions {

    constructor( game ) {
        this.game = game
    }

    getGameButtons() {
        const gameButtons = document.createElement( 'div' )
        gameButtons.id = 'game-buttons'
        gameButtons.append( this.getNewGameButton() )
        gameButtons.append( this.getCheckButton() )
        return gameButtons
    }

    getNewGameButton() {
        const newGameButton = document.createElement( 'button' )
        newGameButton.id = 'newGame'
        newGameButton.innerText = 'New Game'
        newGameButton.addEventListener( 'click', this.game.startGame.bind( this.game ) )
        return newGameButton
    }

    getCheckButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'check'
        checkButton.innerText = 'Check'
        checkButton.addEventListener( 'click', this.game.checkValues.bind( this.game ) )
        return checkButton
    }
}
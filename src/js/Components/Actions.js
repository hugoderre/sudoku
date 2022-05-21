export default class Actions {

    constructor( board ) {
        this.board = board
    }

    getActions() {
        const actions = document.createElement( 'div' )
        actions.id = 'actions'
        actions.classList.add( 'actions' )
        actions.append( this.getNewGameButton() )
        actions.append( this.getCheckButton() )
        return actions
    }

    getNewGameButton() {
        const newGameButton = document.createElement( 'button' )
        newGameButton.id = 'newGame'
        newGameButton.classList.add( 'action' )
        newGameButton.innerText = 'New Game'
        newGameButton.addEventListener( 'click', this.newGameListener.bind( this ) )
        return newGameButton
    }

    newGameListener( e ) {
        console.log( 'new game' )
    }

    getCheckButton() {
        const checkButton = document.createElement( 'button' )
        checkButton.id = 'check'
        checkButton.classList.add( 'action' )
        checkButton.innerText = 'Check'
        checkButton.addEventListener( 'click', this.checkListener.bind( this ) )
        return checkButton
    }

    checkListener( e ) {
        console.log( 'check' )
    }
}
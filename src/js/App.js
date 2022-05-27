import Board from "./Components/Board.js";
import Actions from "./Components/Actions.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {
        this.board = new Board()
        this.rootDOM.append( this.board.getBoard() )

        this.actions = new Actions( this.board )
        this.rootDOM.append( this.actions.getGameButtons() )
    }
}

new App()
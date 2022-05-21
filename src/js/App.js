import Board from "./Components/Board.js";
import Actions from "./Components/Actions.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.board = new Board()
        this.actions = new Actions( this.board )
        this.init()
    }

    init() {
        this.rootDOM.append( this.board.getBoard() )
        this.rootDOM.append( this.actions.getActions() )
    }
}

new App()
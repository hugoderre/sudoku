import Board from "./Components/Board.js";
import Actions from "./Components/Actions.js";

class Sudoku {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.board = new Board()
        this.actions = new Actions()
        this.init()
    }

    init() {
        this.rootDOM.append( this.board.getBoard() )
        // TODO
        // this.rootDOM.append( this.actions.getActions() )
    }
}

new Sudoku()
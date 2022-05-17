import Board from "./Sudoku/Board.js";
import Actions from "./Sudoku/Actions.js";

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
import Board from "./Components/Board.js";
import Actions from "./Components/Actions.js";

class Sudoku {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.board = new Board()
        this.init()
    }

    init() {
        this.rootDOM.append( this.board.getBoard() )
        this.rootDOM.append( Actions.getActions() )
    }
}

new Sudoku()
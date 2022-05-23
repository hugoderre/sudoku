import Generator from './Generator.js';

export default class Game {
    constructor( board ) {
        this.board = board
        this.correctValues = []
    }

    startGame() {
        this.board.clearBoard()
        this.correctValues = new Generator( this.board, 'easy' ).generateValues()
    }

    checkValues( e ) {
        this.board.unsetEditableCell()
        this.board.clearCheckModeCells()
        
        for ( let i = 0; i < this.board.cells.length; i++ ) {
            const cell = this.board.cells[ i ]
            const boardValue = this.board.getCellValue( cell )
            const correctValue = this.getCorrectValue( cell )
            this.board.setCellCheckState( cell, boardValue == correctValue )
        }
    }

    getCorrectValue( cell ) {
        return this.correctValues[ this.board.cells.indexOf( cell )  ]
    }
}
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

        let a = 0
        let b = 0
        for (let i = 0; i < 81; i++) {
            if(i != 0) {
                if(i % 27 === 0) {
                    a += 3
                    b = 0
                }
                if(i % 9 === 0) {
                    a -= 3
                    b += 3
                }
                if(i % 3 === 0) {
                    a++
                    b -= 3
                }
            }
            const cell = this.board.cells[i]
            const cellValue = this.board.getCellValue( cell )
            const correctValue = this.correctValues[a][b]
            this.board.setCellCheckState( cell, cellValue == correctValue )
            b++
        }
    }
}
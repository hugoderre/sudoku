export default class Game {
    constructor( board ) {
        this.board = board
        this.correctValues = []
    }

    startGame() {
        this.board.clearBoard()

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = this.board.cells[ i * 9 + j ]
                this.board.updateCellValue( cell, 7 )
                this.correctValues.push( 7 )
            }
        }
        
    }

    checkValues( e ) {
        this.board.unsetEditableCell()
        this.board.clearCheckModeCells()
        for ( let i = 0; i < this.board.cells.length; i++ ) {
            const cell = this.board.cells[ i ]
            const value = this.board.getCellValue( cell )
            const correctValue = this.getCorrectValue( cell )
            this.board.setCellCheckState( cell, value == correctValue )
        }
    }

    getCorrectValue( cell ) {
        const cellIndex = this.board.cells.indexOf( cell )
        return this.correctValues[ cellIndex - 1 ]
    }
}
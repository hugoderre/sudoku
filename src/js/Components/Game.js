import Generator from './Generator.js';
import Helpers from './Helpers.js';

export default class Game {
    constructor( board ) {
        this.board = board
        this.correctValues = []
    }

    startGame() {
        this.board.clearBoard()
        this.correctValues = new Generator( this.board, 'hard' ).generateValues()
    }

    checkValues( e ) {
        this.board.unsetEditableCell()
        this.board.clearCheckModeCells()

        const correctGroups = Helpers.convertRowValuesToGroupedValues( this.correctValues );
        const correctGroupsFlat = Helpers.concatArraysInArray( correctGroups );

        for (let i = 0; i < correctGroupsFlat.length; i++) {
            const cell = this.board.cells[i]
            const cellValue = this.board.getCellValue( cell )
            this.board.setCellCheckState( cell, cellValue == correctGroupsFlat[i] )
        }
    }
}
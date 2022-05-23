export default class Generator {
    constructor( board, difficulty ) {
        this.board = board
        this.difficulty = difficulty
    }

    generateValues() {
        const sudokuValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

        for (let i = 0; i < 9; i++) {
            const sudokuValue = sudokuValues.splice( Math.floor( Math.random() * sudokuValues.length ), 1 )[ 0 ]

            for (let groupIndex = 0; groupIndex < 9; groupIndex++) {
                const randomCellIndex = Math.floor( Math.random() * 9 )
                const currentCell = this.board.cells[ groupIndex * 9 + randomCellIndex ]

                if( this.board.getCellValue( currentCell ) ) {
                    groupIndex--
                    continue
                }

                if ( ! this.isLegalValue( currentCell, sudokuValue ) ) {
                    continue
                }

                this.board.updateCellValue( currentCell, sudokuValue )
            }
        }
    }

    isLegalValue( cell ) {
        let currentGroupIndex = this.board.getGroupIndex( cell )
        // X+ resolution
        while ( currentGroupIndex % 3 != 0 ) {
            currentGroupIndex++
            if ( ! this.isLegalRowX( this.board.getGroupOfCells( currentGroupIndex - 1 ), cell ) ) {
                return
            }
        }

        currentGroupIndex = this.board.getGroupIndex( cell )

        // X- resolution
        while ( ( currentGroupIndex + 2 ) % 3 != 0 ) {
            currentGroupIndex--
            if ( ! this.isLegalRowX( this.board.getGroupOfCells( currentGroupIndex - 1 ), cell ) ) {
                return
            }
        }

        currentGroupIndex = this.board.getGroupIndex( cell )

        // Y+ resolution
        while ( currentGroupIndex > 3 ) {
            currentGroupIndex -= 3
            if ( ! this.isLegalRowY( this.board.getGroupOfCells( currentGroupIndex - 1 ), cell ) ) {
                return
            }
        }

        currentGroupIndex = this.board.getGroupIndex( cell )

        // Y+ resolution
        while ( currentGroupIndex < 7 ) {
            currentGroupIndex += 3
            if ( ! this.isLegalRowY( this.board.getGroupOfCells( currentGroupIndex - 1 ), cell ) ) {
                return
            }
        }

        return true
    }

    isLegalRowX( group, cell ) {
        let baseX = Math.ceil( cell.dataset.cellIndex / 3 )

        if ( baseX = 2 ) {
            baseX = 4
        }

        if ( baseX = 3 ) {
            baseX = 7
        }

        for (let i = baseX; i < baseX + 3; i++) {
            if ( ! this.board.getCellValue( group[i] ) ) {
                continue
            }
            if ( this.board.getCellValue( group[i] ) == this.board.getCellValue( cell )  ) {
                return
            }
        }
        return true
    }

    isLegalRowY( group, cell ) {
        let baseY = cell.dataset.cellIndex % 3
        
        if ( ! baseY ) {
            baseY = 3
        }

        for (let i = baseY; i < baseY + 4; i++) {
            if ( ! this.board.getCellValue( group[i] ) ) {
                continue
            }
            if ( this.board.getCellValue( group[i] ) == this.board.getCellValue( cell )  ) {
                return
            }
        }

        return true
    }
}
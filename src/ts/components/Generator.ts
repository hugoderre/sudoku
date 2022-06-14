import Grid from './Grid'
import Helpers from './Helpers'

export default class Generator {
    grid: Grid
    difficulty: string
    gridValues: number[][] = this.getBaseGrid()

    constructor( grid: Grid, difficulty: string ) {
        this.grid = grid
        this.difficulty = difficulty
    }

    generateValues() {

        for ( let i = 0; i < 200; i++ ) {
            this.shuffleDigits()
        }

        for ( let i = 0; i < 20; i++ ) {
            this.shuffleRows( [ 0, 2 ] )
            this.shuffleRows( [ 3, 5 ] )
            this.shuffleRows( [ 6, 8 ] )
        }

        for ( let i = 0; i < 20; i++ ) {
            this.shuffleColumns( [ 0, 2 ] )
            this.shuffleColumns( [ 3, 5 ] )
            this.shuffleColumns( [ 6, 8 ] )
        }

        // Format grid values order to match the grid
        const correctValues = Helpers.concatArraysInArray( Helpers.convertRowValuesToGroupedValues( this.gridValues ) )

        for ( let i = 0; i < correctValues.length; i++ ) {
            this.grid.updateCellValue( this.grid.cells[ i ], correctValues[ i ], false )
        }

        this.hideSomeCellsInGroups()

        return correctValues
    }

    getBaseGrid(): number[][] {
        return ( [
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
            [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
            [ 2, 3, 1, 5, 6, 4, 8, 9, 7 ],
            [ 5, 6, 4, 8, 9, 7, 2, 3, 1 ],
            [ 8, 9, 7, 2, 3, 1, 5, 6, 4 ],
            [ 3, 1, 2, 6, 4, 5, 9, 7, 8 ],
            [ 6, 4, 5, 9, 7, 8, 3, 1, 2 ],
            [ 9, 7, 8, 3, 1, 2, 6, 4, 5 ],
        ] )
    }

    shuffleDigits(): void {
        const possibleDigits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
        const randomDigit1 = Math.ceil( Math.random() * possibleDigits.length )
        possibleDigits.splice( possibleDigits.indexOf( randomDigit1 ), 1 )
        const randomDigit2 = Math.ceil( Math.random() * possibleDigits.length )

        const groups = Helpers.convertRowValuesToGroupedValues( this.gridValues )

        for ( let i = 0; i < groups.length; i++ ) {
            let randomIndex1 = groups[ i ].indexOf( randomDigit1 )
            let randomIndex2 = groups[ i ].indexOf( randomDigit2 )
            this.gridValues[ i ][ randomIndex1 ] = randomDigit2
            this.gridValues[ i ][ randomIndex2 ] = randomDigit1
        }
    }

    shuffleRows( range: number[] ): void {
        const min = range[ 0 ]
        const max = range[ 1 ]
        const randomRow = Math.floor( Math.random() * ( max - min + 1 ) + min )
        const randomRow2 = Math.floor( Math.random() * ( max - min + 1 ) + min )
        const row = this.gridValues[ randomRow ]
        this.gridValues[ randomRow ] = this.gridValues[ randomRow2 ]
        this.gridValues[ randomRow2 ] = row
    }

    shuffleColumns( range: number[] ) {
        const min = range[ 0 ]
        const max = range[ 1 ]
        const randomColumn = Math.floor( Math.random() * ( max - min + 1 ) + min )
        const randomColumn2 = Math.floor( Math.random() * ( max - min + 1 ) + min )
        const column = this.gridValues.map( row => row[ randomColumn ] )
        this.gridValues.map( ( row, i ) => row[ randomColumn ] = this.gridValues[ i ][ randomColumn2 ] )
        this.gridValues.map( ( row, i ) => row[ randomColumn2 ] = column[ i ] )
    }

    hideSomeCellsInGroups() {
        let cellQuantityPerGroupToHide;
        switch ( this.difficulty ) {
            case 'easy':
                cellQuantityPerGroupToHide = 4
                break
            case 'medium':
                cellQuantityPerGroupToHide = 5
                break
            case 'hard':
                cellQuantityPerGroupToHide = 6
                break
            default:
                cellQuantityPerGroupToHide = 0
                break
        }

        let possibleIndexes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
        let indexesToHide: number[] = []
        for ( let i = 0; i < this.grid.cells.length; i++ ) {
            if ( i % 9 === 0 ) {
                indexesToHide = []
                for ( let j = 0; j < cellQuantityPerGroupToHide; j++ ) {
                    let randomIndex = Math.floor( Math.random() * possibleIndexes.length )
                    indexesToHide.push( possibleIndexes[ randomIndex ] );
                    possibleIndexes.splice( possibleIndexes.indexOf( possibleIndexes[ randomIndex ] ), 1 )
                }
                possibleIndexes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
            }
            if ( indexesToHide.includes( i % 9 ) ) {
                this.grid.removeCellValue( this.grid.cells[ i ] ) // Values to find
            } else {
                this.grid.cells[ i ].classList.add( 'static' ) // Base values
            }
        }
    }
}


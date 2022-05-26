import Helpers from "./Helpers.js"

export default class Board {
    constructor() {
        this.userEditableCell = null
        this.cells = []
        this.DOMContainer = this.initBoard()
    }

    initBoard() {
        const board = document.createElement( 'div' )
        board.id = 'board'
        for ( let groupIndex = 1; groupIndex <= 9; groupIndex++ ) {
            let groupElement = document.createElement( 'div' )
            groupElement.dataset.groupIndex = groupIndex
            groupElement.classList.add( 'group' )
            for ( let cellIndex = 1; cellIndex <= 9; cellIndex++ ) {
                let cellElement = document.createElement( 'div' )
                cellElement.classList.add( 'cell' )
                cellElement.dataset.cellIndex = cellIndex
                cellElement.addEventListener( 'click', this.cellEditableListener.bind( this ) )
                groupElement.append( cellElement )
                this.cells.push( cellElement )
            }
            board.append( groupElement )
        }

        document.addEventListener( 'keydown', this.handleCellUserInput.bind( this ) )

        return board;
    }

    getBoard() {
        return this.DOMContainer
    }

    cellEditableListener( e ) {
        this.clearCheckModeCells()
        
        if ( this.userEditableCell ) {
            this.unsetEditableCell()
        }
        this.userEditableCell = e.target
        this.userEditableCell.classList.add( 'editable' )

        const attachedCells = this.getCellsAttachedToEditableCell( this.userEditableCell )
        for ( let i = 0; i < attachedCells.length; i++ ) {
            attachedCells[i].classList.add( 'attached-to-editable' )
        }
    }

    unsetEditableCell() {
        if ( this.userEditableCell ) {
            this.userEditableCell.classList.remove( 'editable' )
        }
        this.userEditableCell = null

        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[i].classList.remove( 'attached-to-editable' )
        }
    }

    handleCellUserInput( e ) {
        if ( ! ( this.userEditableCell instanceof HTMLElement ) ) {
            return
        }

        if ( isNaN( e.key ) || e.key === '0' ) {
            return
        }

        this.updateCellValue( this.userEditableCell, e.key )
    }

    updateCellValue( cell, value ) {
        let valueElement = document.createElement( 'span' )
        valueElement.innerText = value
        cell.innerHTML = valueElement.outerHTML
    }

    getRowedCellsDataFormat() {
        return Helpers.concatArraysInArray( Helpers.convertGroupedValuesToRowValues( Helpers.arraysInArray( this.cells ) ) )
    }

    getCellsAttachedToEditableCell( cell ) {
        const attachedCells = [
            ...this.getGroupOfCells( this.getGroupIndex( cell ) ),
            ...this.getRowOfCells( cell ),
            ...this.getColumnOfCells( cell )
        ]
        // Get unique values
        return [...new Set(attachedCells)]
    }

    getGroupOfCells( groupIndex ) {
        return this.cells.slice( ( groupIndex - 1 ) * 9, groupIndex * 9 )
    }

    getRowOfCells( cell ) {
        const rowIndex = this.getRowIndex( cell )
        
        return this.cells.filter( ( cell ) => {
            return this.getRowIndex( cell ) == rowIndex
        } )
    }

    getColumnOfCells( cell ) {
        const columnIndex = this.getColumnIndex( cell )
        
        return this.cells.filter( ( cell ) => {
            return this.getColumnIndex( cell ) == columnIndex
        } )
    }

    getRowIndex( cell ) {
        return Math.floor( this.getRowedCellsDataFormat().indexOf( cell ) / 9 )
    }

    getColumnIndex( cell ) {
        return this.getRowedCellsDataFormat().indexOf( cell ) % 9
    }

    getCellValue( cell ) {
        if ( ! cell ) {
            return null
        }
        return cell.innerText
    }

    getGroupIndex( cell ) {
        return parseInt( cell.parentNode.dataset.groupIndex )
    }

    setCellCheckState( cell, isCorrect ) {
        cell.classList.add( 
            isCorrect ? 'correct' : 'incorrect'
        )
    }

    clearCheckModeCells() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.remove( 'correct' )   
            this.cells[ i ].classList.remove( 'incorrect' )   
        }
    }

    clearBoard() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            const cell = this.cells[ i ]
            cell.innerHTML = ''
            this.clearCheckModeCells()
        }
    }
}
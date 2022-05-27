import Generator from "./Generator.js"
import Helpers from "./Helpers.js"

export default class Board {
    constructor() {
        this.userEditableCell = null
        this.cells = []
        this.correctValues = []
        this.checkMode = true
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

    startGame() {
        this.clearBoard()
        this.correctValues = new Generator( this, 'hard' ).generateValues()
    }

    verifyValues() {
        this.unsetEditableCell()
        this.clearVerifyMode()

        const correctGroups = Helpers.convertRowValuesToGroupedValues( this.correctValues )
        const correctGroupsFlat = Helpers.concatArraysInArray( correctGroups )

        this.setVerifyMode( correctGroupsFlat )
    }

    cellEditableListener( e ) {
        // Return if player click on a static cell
        if ( e.target.classList.contains('static') ) {
            return
        }

        this.clearVerifyMode()

        if ( this.userEditableCell ) {
            this.unsetEditableCell()
        }
        
        this.setEditableCell( e.target )
    }

    setEditableCell( cell ) {
        this.userEditableCell = cell
        this.userEditableCell.classList.add( 'editable' )
        this.highlightCells( this.userEditableCell )
    }

    unsetEditableCell() {
        if ( this.userEditableCell ) {
            this.userEditableCell.classList.remove( 'editable' )
        }
        this.userEditableCell = null

        this.unsetHighlightCells()
    }

    highlightCells( cell ) {
        this.unsetHighlightCells()

        const attachedCells = this.getCellsAttachedToEditableCell( cell )
        for ( let i = 0; i < attachedCells.length; i++ ) {
            attachedCells[i].classList.add( 'attached-to-editable' )
        }

        if( this.checkMode ) {
            this.highlightConflictCells()
        }
    }

    highlightConflictCells() {
        console.log( 'highlightConflictCells' )
        console.log(this.correctValues)
    }

    unsetHighlightCells() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.remove( 'attached-to-editable' )
            this.cells[ i ].classList.remove( 'incorrect' )
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
        this.highlightCells( this.userEditableCell )
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
            ...this.getColumnOfCells( cell ),
            ...this.getCellsWithSameValue( cell )
        ]
        // Get unique values
        return [ ...new Set( attachedCells ) ]
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

    getCellsWithSameValue( cell ) {
        const value = this.getCellValue( cell )
        if ( ! value ) {
            return []
        }
        return this.cells.filter( ( cell ) => {
            return this.getCellValue( cell ) == value
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

    setVerifyMode( correctValues ) {
        for (let i = 0; i < correctValues.length; i++) {
            const cell = this.cells[i]
            const cellValue = this.getCellValue( cell )
            cell.classList.add( 
                cellValue == correctValues[i] ? 'correct' : 'incorrect'
            )
        }
    }

    clearVerifyMode() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.remove( 'correct' )   
            this.cells[ i ].classList.remove( 'incorrect' )   
        }
    }

    clearBoard() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].innerHTML = ''
            this.cells[ i ].classList.remove( 'static' )  
            this.clearVerifyMode()
        }
    }
}
import Helpers from "./Helpers"

export default class Grid {
    userEditableCell: Cell | null = null
    cells: Cell[] = []
    correctValues: number[] = []
    DOMContainer: HTMLDivElement

    constructor( ) {
        this.DOMContainer = this.initBoard()
    }

    getBoard() {
        return this.DOMContainer
    }

    initBoard(): HTMLDivElement {
        const grid = document.createElement( 'div' )
        grid.id = 'grid'
        for ( let groupIndex = 1; groupIndex <= 9; groupIndex++ ) {
            let groupElement = document.createElement( 'div' )
            groupElement.dataset.groupIndex = groupIndex.toString()
            groupElement.classList.add( 'group' )
            for ( let cellIndex = 1; cellIndex <= 9; cellIndex++ ) {
                let cellElement = document.createElement( 'div' )
                cellElement.classList.add( 'cell' )
                cellElement.dataset.cellIndex = cellIndex.toString()
                cellElement.addEventListener( 'click', this.cellEditableListener.bind( this ) )
                groupElement.append( cellElement )
                this.cells.push( cellElement )
            }
            grid.append( groupElement )
        }
        this.setCellsInStaticMode()
        return grid;
    }

    cellEditableListener( e: MouseEvent ) {
        const cell = e.target as Cell

        // Return if player click on a static cell
        if ( cell.classList.contains( 'static' ) ) {
            return
        }

        this.clearVerifyMode()
        this.setEditableCell( cell )
    }

    setEditableCell( cell: Cell ) {
        this.unsetEditableCell()
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

    highlightCells( cell: Cell ) {
        this.unsetHighlightCells()
        this.highlightAttachedCells( cell )
        this.highlightAllConflictCells()
    }

    highlightAttachedCells( cell: Cell ) {
        const attachedCells = this.getCellsAttachedToEditableCell( cell )
        for ( let i = 0; i < attachedCells.length; i++ ) {
            attachedCells[ i ].classList.add( 'attached-to-editable' )
        }
    }

    highlightAllConflictCells() {
        for ( const cell of this.cells ) {
            if ( !this.getCellValue( cell ) ) {
                continue
            }
            let siblingCells = [
                ...this.getGroupOfCells( cell ),
                ...this.getRowOfCells( cell ),
                ...this.getColumnOfCells( cell )
            ]
            for ( const siblingCell of siblingCells ) {
                if ( cell != siblingCell && this.getCellValue( cell ) == this.getCellValue( siblingCell ) ) {
                    siblingCell.classList.add( 'incorrect' )
                }
            }
        }
    }

    unsetHighlightCells() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.remove( 'attached-to-editable' )
            this.cells[ i ].classList.remove( 'incorrect' )
        }
    }

    updateCellValue( cell: Cell, value: number, highlight = true ) {
        let valueElement = document.createElement( 'span' )
        valueElement.innerText = typeof value == 'number' ? value.toString() : ''
        cell.innerHTML = valueElement.outerHTML

        if ( highlight ) {
            this.highlightCells( cell )
        }
    }

    removeCellValue( cell: Cell, highlight = true ) {
        cell.innerHTML = ''

        if ( highlight ) {
            this.highlightCells( cell )
        }
    }

    getRowedCellsDataFormat() {
        return Helpers.concatArraysInArray( Helpers.convertGroupedValuesToRowValues( Helpers.arraysInArray( this.cells ) ) )
    }

    getCellsAttachedToEditableCell( cell: Cell ) {
        const attachedCells = [
            ...this.getGroupOfCells( cell ),
            ...this.getRowOfCells( cell ),
            ...this.getColumnOfCells( cell ),
            ...this.getCellsWithSameValue( cell )
        ]
        // Get unique values
        return [ ...new Set( attachedCells ) ]
    }

    getGroupOfCells( cell: Cell ): Cell[] {
        const groupIndex = this.getGroupIndex( cell )
        return this.cells.slice( ( groupIndex - 1 ) * 9, groupIndex * 9 )
    }

    getRowOfCells( cell: Cell ): Cell[] {
        const rowIndex = this.getRowIndex( cell )

        return this.cells.filter( ( cell ) => {
            return this.getRowIndex( cell ) == rowIndex
        } )
    }

    getColumnOfCells( cell: Cell ): Cell[] {
        const columnIndex = this.getColumnIndex( cell )

        return this.cells.filter( ( cell ) => {
            return this.getColumnIndex( cell ) == columnIndex
        } )
    }

    getCellsWithSameValue( cell: Cell ): Cell[] {
        const value = this.getCellValue( cell )
        if ( !value ) {
            return []
        }
        return this.cells.filter( ( cell ) => {
            return this.getCellValue( cell ) == value
        } )
    }

    getRowIndex( cell: Cell ): number {
        return Math.floor( this.getRowedCellsDataFormat().indexOf( cell ) / 9 )
    }

    getColumnIndex( cell: Cell ): number {
        return this.getRowedCellsDataFormat().indexOf( cell ) % 9
    }

    getCellValue( cell: Cell ): number | null {
        if ( !cell ) {
            return null
        }
        return cell.innerText ? parseInt( cell.innerText ) : null
    }

    getGroupIndex( cell: Cell ): number  {
        return parseInt(cell.parentElement!.dataset.groupIndex!)
    }

    isGridFullyFilled(): boolean {
        for ( const cell of this.cells ) {
            if ( !this.getCellValue( cell ) ) {
                return false
            }
        }
        return true
    }

    isGridSolved(): boolean {
        if ( !this.correctValues ) {
            return false
        }

        for ( let i = 0; i < this.correctValues.length; i++ ) {
            const cell = this.cells[ i ]
            if ( !this.getCellValue( cell ) ) {
                return false
            }
            if ( this.getCellValue( cell ) != this.correctValues[ i ] ) {
                return false
            }
        }
        return true
    }

    displayConfettis( show = true ) {
        const size = show ? '100%' : '0%'
        this.DOMContainer.style.setProperty( '--confetti-element-size', size );
    }

    setVerifyMode(): void {
        if ( !this.correctValues ) {
            return
        }

        for ( let i = 0; i < this.correctValues.length; i++ ) {
            const cell = this.cells[ i ]
            cell.classList.add(
                this.getCellValue( cell ) == this.correctValues[ i ] ? 'correct' : 'incorrect'
            )
        }
    }

    clearVerifyMode() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.remove( 'correct' )
            this.cells[ i ].classList.remove( 'incorrect' )
        }
    }

    setCellsInStaticMode() {
        for ( let i = 0; i < this.cells.length; i++ ) {
            this.cells[ i ].classList.add( 'static' )
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
class Sudoku {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.map = {}
        this.userEditableCell = null
        this.init()
    }

    init() {
        this.createMap()
        document.addEventListener( 'keydown', this.handleCellUserInput.bind( this ) )
    }

    createMap() {
        for ( let groupIndex = 1; groupIndex <= 9; groupIndex++ ) {
            let groupElement = document.createElement( 'div' )
            groupElement.dataset.group = groupIndex
            groupElement.classList.add( 'group' )
            for ( let cellIndex = 1; cellIndex <= 9; cellIndex++ ) {
                let cellElement = document.createElement( 'div' )
                cellElement.classList.add( 'cell' )
                cellElement.dataset.cell = cellIndex
                cellElement.addEventListener( 'click', this.cellEditableListener.bind( this ) )
                groupElement.append( cellElement )
            }
            this.rootDOM.append( groupElement )
        }
    }

    cellEditableListener( e ) {
        if( !this.userEditableCell || this.userEditableCell != e.target ) {
            this.disableUserEditableCell()
            this.userEditableCell = e.target
        }
        this.userEditableCell.classList.toggle( 'editable' )
    }

    disableUserEditableCell() {
        if( this.userEditableCell instanceof HTMLElement  ) {
            this.userEditableCell.classList.toggle( 'editable' )
        }
        this.userEditableCell = null
    }

    handleCellUserInput( e ) {
        if ( ! ( this.userEditableCell instanceof HTMLElement ) ) {
            return
        }

        if ( isNaN( e.key ) ) {
            return
        }

        let cellValueElement = document.createElement( 'span' )
        cellValueElement.innerText = e.key
        this.userEditableCell.innerHTML = cellValueElement.outerHTML
    }

}

new Sudoku()
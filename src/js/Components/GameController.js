import Generator from "./Generator.js"
import Helpers from "./Helpers.js"

export default class GameController {
    constructor( grid, gameUI ) {
        this.grid = grid
        this.gameUI = gameUI
        this.init()
    }

    init() {
        document.getElementById( 'new-game' ).addEventListener( 'click', this.newGame.bind( this ) )

        document.getElementById( 'verify' ).addEventListener( 'click', this.verifyValues.bind( this ) )

        const padNumbers = document.getElementsByClassName( 'pad-number' )
        for ( const padNumber of padNumbers ) {
            padNumber.addEventListener( 'click', this.handlePadNumber.bind( this ) )
        }

        document.getElementById( 'cell-erase' ).addEventListener( 'click', this.handleCellErase.bind( this ) )

        document.getElementById( 'cell-tip' ).addEventListener( 'click', this.handleCellTip.bind( this ) )

        document.addEventListener( 'keydown', this.handleUserKeyInputs.bind( this ) )
    }

    newGame() {
        this.grid.clearBoard()
        this.grid.correctValues = new Generator( this.grid, this.gameUI.getUserDifficulty() ).generateValues()
        this.gameUI.timer.start()
    }

    verifyValues() {
        if ( !this.grid.correctValues ) {
            return
        }

        this.grid.clearVerifyMode()
        this.grid.setVerifyMode()
    }

    handlePadNumber( e ) {
        if ( !this.grid.userEditableCell ) {
            return
        }

        this.grid.updateCellValue( this.grid.userEditableCell, e.target.innerText )
        this.grid.highlightCells( this.grid.userEditableCell )
        this.handleMaybeSolvedGrid()
    }

    handleCellErase() {
        if ( !this.grid.userEditableCell ) {
            return
        }

        this.grid.updateCellValue( this.grid.userEditableCell, '' )
        this.grid.highlightCells( this.grid.userEditableCell )
    }

    handleCellTip() {
        if ( !this.grid.userEditableCell ) {
            return
        }

        const editableCellIndex = this.grid.cells.indexOf( this.grid.userEditableCell )
        this.grid.updateCellValue( this.grid.userEditableCell, this.grid.correctValues[ editableCellIndex ] )
        this.grid.highlightCells( this.grid.userEditableCell )
        this.handleMaybeSolvedGrid()
    }

    handleUserKeyInputs( e ) {
        if ( !( this.grid.userEditableCell instanceof HTMLElement ) ) {
            return
        }

        if ( e.key == 'Backspace' ) {
            this.grid.updateCellValue( this.grid.userEditableCell, '' )
        }

        if ( !isNaN( e.key ) && e.key != '0' ) {
            this.grid.updateCellValue( this.grid.userEditableCell, e.key )
        }

        this.grid.highlightCells( this.grid.userEditableCell )
        this.handleMaybeSolvedGrid()
    }


    handleMaybeSolvedGrid() {
        if ( this.grid.isGridSolved() ) {
            this.gameWon()
        } else if ( this.grid.isGridFullyFilled() ) {
            this.verifyValues()
        }
    }

    gameWon() {
        this.grid.setVerifyMode()
        this.gameUI.timer.stop()
        this.gameUI.winModal.show()
        this.grid.setCellsInStaticMode()
        this.grid.unsetEditableCell()
    }
}
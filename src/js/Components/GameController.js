import Generator from "./Generator.js"
import Helpers from "./Helpers.js"

export default class GameController {
    constructor( grid, gameUI ) {
        this.grid = grid
        this.gameUI = gameUI
        this.init()
    }

    init() {
        // New game
        document.getElementById( 'new-game' ).addEventListener( 'click', this.startGame.bind( this ) )

        // Verify values
        document.getElementById( 'verify' ).addEventListener( 'click', this.verifyValues.bind( this ) )

        // Pad number
        const padNumbers = document.getElementsByClassName( 'pad-number' )
        for ( const padNumber of padNumbers ) {
            padNumber.addEventListener( 'click', this.handlePadNumber.bind( this ) )
        }

        // Cell erase button
        document.getElementById( 'cell-erase' ).addEventListener( 'click', this.handleCellErase.bind( this ) )

        // Cell tip button
        document.getElementById( 'cell-tip' ).addEventListener( 'click', this.handleCellTip.bind( this ) )

        // User keys inputs
        document.addEventListener( 'keydown', this.handleUserKeyInputs.bind( this ) )
    }

    startGame() {
        this.grid.clearBoard()
        this.grid.correctValues = new Generator( this.grid, this.gameUI.getUserDifficulty() ).generateValues()
        this.gameUI.timer.start()
        this.gameUI.createWinModal( this.gameUI.timer.getTime() )
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

        this.grid.setCellsInStaticMode()
        this.grid.unsetEditableCell()
    }
}
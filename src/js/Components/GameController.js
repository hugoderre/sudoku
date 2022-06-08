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
        this.gameUI.newGameButton.addEventListener( 'click', this.startGame.bind( this ) )

        // Verify values
        this.gameUI.checkButton.addEventListener( 'click', this.verifyValues.bind( this ) )

        // Pad number
        for ( const padNumber of this.gameUI.padNumbers.children ) {
            padNumber.addEventListener( 'click', this.handlePadNumber.bind( this ) )
        }

        // Cell erase button
        this.gameUI.cellEraseButton.addEventListener( 'click', this.handleCellErase.bind( this ) )

        // Cell tip button
        this.gameUI.tipCellButton.addEventListener( 'click', this.handleCellTip.bind( this ) )

        // User keys inputs
        document.addEventListener( 'keydown', this.handleUserKeyInputs.bind( this ) )
    }

    startGame() {
        this.grid.clearBoard()
        this.grid.correctValues = new Generator( this.grid, this.gameUI.getUserDifficulty() ).generateValues()
        this.gameUI.timer.start()
    }

    verifyValues() {
        if ( !this.grid.correctValues ) {
            return
        }
        this.grid.unsetEditableCell()
        this.grid.clearVerifyMode()

        this.grid.setVerifyMode()
    }

    handlePadNumber( e ) {
        if ( !this.grid.userEditableCell ) {
            return
        }

        this.grid.updateCellValue( this.grid.userEditableCell, e.target.innerText )
        this.grid.highlightCells( this.grid.userEditableCell )
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
        // const correctGroups = Helpers.convertRowValuesToGroupedValues( this.grid.correctValues )
        // const correctValuesFlat = Helpers.concatArraysInArray( correctGroups )
        this.grid.updateCellValue( this.grid.userEditableCell, this.grid.correctValues[ editableCellIndex ] )
        this.grid.highlightCells( this.grid.userEditableCell )
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

        if ( this.grid.isGridSolved() ) {
            this.grid.setVerifyMode()
            this.gameUI.timer.stop()
            this.gameUI.showWinMessage( this.gameUI.timer.getTime() )
            this.grid.setCellsInStaticMode()
        } else if ( this.grid.isGridFullyFilled() ) {
            this.verifyValues()
        }
    }
}
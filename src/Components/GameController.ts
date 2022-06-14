import GameUI from "./GameUI"
import Generator from "./Generator"
import Grid from "./Grid"

export default class GameController {
    grid: Grid
    gameUI: GameUI

    constructor( grid: Grid, gameUI: GameUI ) {
        this.grid = grid
        this.gameUI = gameUI
        this.initEventListeners()
        this.newGame() // Start a new game on page load
    }

    initEventListeners() {
        document.getElementById( 'new-game' )?.addEventListener( 'click', this.newGame.bind( this ) )

        document.getElementById( 'verify' )?.addEventListener( 'click', this.verifyValues.bind( this ) )

        const padNumbers: Element[] = Array.from( document.getElementsByClassName( 'pad-number' ) )
        for ( const padNumber of padNumbers ) {
            padNumber.addEventListener( 'click', this.handlePadNumber.bind( this ) )
        }

        document.getElementById( 'cell-erase' )?.addEventListener( 'click', this.handleCellErase.bind( this ) )

        document.getElementById( 'cell-tip' )?.addEventListener( 'click', this.handleCellTip.bind( this ) )

        document.addEventListener( 'keydown', this.handleUserKeyInputs.bind( this ) )
    }

    newGame() {
        this.grid.clearBoard()
        this.grid.displayConfettis( false )
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

    handlePadNumber( e: Event ) {
        if ( !this.grid.userEditableCell ) {
            return
        }

        const padNumber: HTMLDivElement = e.target as HTMLDivElement
        this.grid.updateCellValue( this.grid.userEditableCell, parseInt( padNumber.innerText ) )
        this.handleMaybeSolvedGrid()
    }

    handleCellErase() {
        if ( !this.grid.userEditableCell ) {
            return
        }

        this.grid.removeCellValue( this.grid.userEditableCell )
    }

    handleCellTip() {
        if ( !this.grid.userEditableCell ) {
            return
        }

        const editableCellIndex = this.grid.cells.indexOf( this.grid.userEditableCell )
        this.grid.updateCellValue( this.grid.userEditableCell, this.grid.correctValues[ editableCellIndex ] )
        this.handleMaybeSolvedGrid()
    }

    handleUserKeyInputs( e: KeyboardEvent ) {
        if ( !( this.grid.userEditableCell instanceof HTMLElement ) ) {
            return
        }

        if ( e.key == 'Backspace' ) {
            this.grid.removeCellValue( this.grid.userEditableCell )
        }

        if ( parseInt( e.key ) > 0 && parseInt( e.key ) <= 9 ) {
            this.grid.updateCellValue( this.grid.userEditableCell, parseInt( e.key ) )
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
        this.grid.displayConfettis( true )
        this.grid.setCellsInStaticMode()
        this.grid.unsetEditableCell()
    }
}
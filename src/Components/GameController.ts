import GameUI from "./GameUI"
import Generator from "./Generator"
import Grid from "./Grid"
import Helpers from "./Helpers"

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

        if ( e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ) {
            this.moveEditableCellWithArrowKey( e )
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

    moveEditableCellWithArrowKey( e: KeyboardEvent, rowedCells?: HTMLDivElement[] ) {
        if ( !this.grid.userEditableCell ) {
            return
        }

        e.preventDefault()

        // Sort cells order to move easily the editable cell
        if ( !rowedCells ) { // Avoid recomputing while recursing
            rowedCells = Helpers.convertFlatGroupedValuesToFlatRowValues( this.grid.cells )
        }

        const editableCellIndex = rowedCells.indexOf( this.grid.userEditableCell )
        let newEditableCellIndex = editableCellIndex
        
        switch ( e.key ) {
            case 'ArrowLeft':
                if ( editableCellIndex % 9 === 0 ) {
                    newEditableCellIndex += 8
                } else {
                    newEditableCellIndex -= 1
                }
                break
            case 'ArrowRight':
                if ( ( editableCellIndex + 1 ) % 9 === 0 ) {
                    newEditableCellIndex -= 8
                } else {
                    newEditableCellIndex += 1
                }
                break
            case 'ArrowUp':
                if ( editableCellIndex <= 8 ) {
                    newEditableCellIndex += 72
                } else {
                    newEditableCellIndex -= 9
                }
                break
            case 'ArrowDown':
                if ( editableCellIndex >= 72 ) {
                    newEditableCellIndex -= 72
                } else {
                    newEditableCellIndex += 9
                }
                break
        }

        if ( rowedCells[ newEditableCellIndex ].classList.contains( 'static' ) ) {
            this.grid.unsetEditableCell()

            // Set the new editable cell directly in property to avoid unnecessary DOM traversal
            this.grid.userEditableCell = rowedCells[ newEditableCellIndex ] as HTMLDivElement

            this.moveEditableCellWithArrowKey( e )
            return
        }

        this.grid.setEditableCell( rowedCells[ newEditableCellIndex ] )
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
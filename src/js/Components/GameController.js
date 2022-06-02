import Generator from "./Generator.js"
import Helpers from "./Helpers.js"

export default class GameController {
    constructor( grid, gameUI ) {
        this.grid = grid
        this.gameUI = gameUI
        this.init()
    }

    init() {
        this.gameUI.newGameButton.addEventListener( 'click', this.startGame.bind( this ) )
        this.gameUI.checkButton.addEventListener( 'click', this.verifyValues.bind( this ) )
        document.addEventListener( 'keydown', this.handleUserKeyInputs.bind( this ) )
    }

    startGame() {
        this.grid.clearBoard()
        this.grid.correctValues = new Generator( this.grid, this.gameUI.getUserDifficulty() ).generateValues()
        this.gameUI.timer.start()
    }

    verifyValues() {
        if( ! this.grid.correctValues ) {
            return
        }
        this.grid.unsetEditableCell()
        this.grid.clearVerifyMode()

        this.grid.setVerifyMode()
    }

    handleUserKeyInputs( e ) {
        if ( ! ( this.grid.userEditableCell instanceof HTMLElement ) ) {
            return
        }

        if ( e.key == 'Backspace' ) {
            this.grid.updateCellValue( this.grid.userEditableCell, '' )
        }

        if ( ! isNaN( e.key ) && e.key != '0' ) {
            this.grid.updateCellValue( this.grid.userEditableCell, e.key )
        }
        
        this.grid.highlightCells( this.grid.userEditableCell )

        if ( this.grid.isGridSolved() ) {
            this.grid.setVerifyMode()
            this.gameUI.timer.stop()
            this.gameUI.showWinMessage( this.gameUI.timer.getTime() )
            this.grid.setCellsInStaticMode()
        } else if( this.grid.isGridFullyFilled() ) {
            this.verifyValues()
        }
    }
}
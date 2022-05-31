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
    }

    startGame() {
        this.grid.clearBoard()
        this.correctValues = new Generator( this.grid, this.gameUI.getUserDifficulty() ).generateValues()
        this.gameUI.timer.start()
    }

    verifyValues() {
        this.grid.unsetEditableCell()
        this.grid.clearVerifyMode()

        const correctGroups = Helpers.convertRowValuesToGroupedValues( this.correctValues )
        const correctGroupsFlat = Helpers.concatArraysInArray( correctGroups )

        this.grid.setVerifyMode( correctGroupsFlat )
    }
}
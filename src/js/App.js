import Grid from "./Components/Grid.js";
import GameUI from "./Components/GameUI.js";
import GameController from "./Components/GameController.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {
        this.grid = new Grid()
        this.rootDOM.append( this.grid.getBoard() )

        this.gameUI = new GameUI( this.grid )
        this.rootDOM.prepend( this.gameUI.getTopElements() )
        this.rootDOM.append( this.gameUI.getBottomElements() )

        new GameController( this.grid, this.gameUI )
    }
}

new App()
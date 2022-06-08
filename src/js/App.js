import Grid from "./Components/Grid.js";
import GameUI from "./Components/GameUI.js";
import GameController from "./Components/GameController.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {

        this.container = document.createElement( 'div' )
        this.container.classList.add('container')

        this.grid = new Grid()
        this.container.append( this.grid.getBoard() )

        this.gameUI = new GameUI( this.grid )
        this.container.prepend( this.gameUI.getTopElements() )
        this.container.append( this.gameUI.getPadNumbers() )
        this.container.append( this.gameUI.getBottomElements() )

        new GameController( this.grid, this.gameUI )

        this.rootDOM.append( this.container )
    }
}

new App()
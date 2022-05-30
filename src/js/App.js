import Grid from "./Components/Grid.js";
import GameUI from "./Components/GameUI.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {
        this.grid = new Grid()
        this.rootDOM.append( this.grid.getBoard() )

        this.gameUI = new GameUI( this.grid )
        this.rootDOM.append( this.gameUI.getElements() )
    }
}

new App()
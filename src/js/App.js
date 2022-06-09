import Grid from "./Components/Grid.js";
import GameUI from "./Components/GameUI.js";
import GameController from "./Components/GameController.js";
import SocialMedia from "./Components/SocialMedia.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {
        this.container = document.createElement( 'div' )
        this.container.classList.add( 'container' )

        this.grid = new Grid()
        this.container.append( this.grid.getBoard() )

        this.gameUI = new GameUI( this.grid )
        this.container.prepend( this.gameUI.getTopElements() )
        this.container.append( this.gameUI.getBottomElements() )

        this.rootDOM.append( this.container )
        this.rootDOM.append( new SocialMedia().getElement() )

        new GameController( this.grid, this.gameUI )
    }
}

new App()
import Grid from "./Components/Grid";
import GameUI from "./Components/GameUI";
import GameController from "./Components/GameController";
import SocialMedia from "./Components/SocialMedia";
import './Assets/scss/style.scss';

class App {
    rootDOM: HTMLElement = document.getElementById( 'root' ) as HTMLElement
    container: HTMLElement = document.createElement( 'div' )
    grid: Grid = new Grid()
    gameUI: GameUI = new GameUI( this.grid )

    constructor() {
        this.init()
    }

    init() {
        this.container.classList.add( 'container' )

        this.container.append( this.grid.getBoard() )

        this.container.prepend( this.gameUI.getTopElements() )
        this.container.append( this.gameUI.getBottomElements() )

        this.rootDOM.append( this.container )
        this.rootDOM.append( new SocialMedia().getElement() )

        new GameController( this.grid, this.gameUI )
    }
}

new App()
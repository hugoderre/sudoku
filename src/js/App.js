import Grid from "./Components/Grid.js";
import Actions from "./Components/Actions.js";

class App {
    constructor() {
        this.rootDOM = document.getElementById( 'root' )
        this.init()
    }

    init() {
        this.grid = new Grid()
        this.rootDOM.append( this.grid.getBoard() )

        this.actions = new Actions( this.grid )
        this.rootDOM.append( this.actions.getGameButtons() )
    }
}

new App()
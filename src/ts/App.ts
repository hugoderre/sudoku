import Grid from "./components/Grid.js";
import GameUI from "./components/GameUI.js";
import GameController from "./components/GameController.js";
import SocialMedia from "./components/SocialMedia.js";

class App {
    rootDOM: HTMLElement = document.getElementById( 'root' )
    container: HTMLElement
    grid: Grid
    gameUI: GameUI

    constructor() {
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


type TupleToObject<T> = {
    [Property in keyof T as `get${Capitalize<string & Property>}`] : T[Property]
}
 // [key in keyof T]: key;

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

const a: TupleToObject<typeof tuple> = { 
    tesla: 'tesla',
    'model 3': 'model 3',
    'model X': 'model X',
    'model Y': 'model Y' 
} 

console.log(a)

type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

// const b: TupleToObject<typeof tupleNumber> = { 
//     a: 1, 
//     b: 2,
//     c: 3,
//     d: 4 
// }

// const c: TupleToObject<typeof tupleMix> = {
//     1: 1,
//     '2': '2',
//     3: 3,
//     '4': '4'
// }
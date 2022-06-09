export default class WinModal {

    constructor( timer ) {
        this.timer = timer
        this.container = null
        this.endTime = null
    }

    getOverlay() {
        this.container = document.createElement( 'div' )
        this.container.id = 'grid-overlay'
        this.container.style.display = 'none'
        this.container.append( this.getContent() )
        return this.container
    }

    show() {
        this.container.style.display = 'block'
        this.endTime.innerHTML = `You have completed the grid in ${this.timer.getTime()} seconds!`
    }

    getContent() {
        const content = document.createElement( 'div' )
        content.id = 'grid-overlay-content'
        content.append( this.getTitle() )
        content.append( this.getEndTime() )
        return content
    }

    getTitle() {
        const title = document.createElement( 'h1' )
        title.innerText = 'You win!'
        return title
    }

    getEndTime() {
        this.endTime = document.createElement( 'p' )
        return this.endTime
    }
}
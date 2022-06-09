export default class WinModal {

    constructor( timer ) {
        this.timer = timer
        this.modalContainer = null
        this.modalTime = null
    }

    getModal() {
        this.modalContainer = document.createElement( 'div' )
        this.modalContainer.id = 'win-modal'
        this.modalContainer.style.display = 'none'
        this.modalContainer.append( this.getWinModalContent() )
        return this.modalContainer
    }

    show() {
        this.modalContainer.style.display = 'block'
        this.modalTime.innerHTML = `You have completed the grid in ${this.timer.getTime()} seconds!`
    }

    getWinModalContent() {
        const content = document.createElement( 'div' )
        content.id = 'win-modal-content'
        content.append( this.getWinModalTitle() )
        content.append( this.getWinModalTime() )
        content.append( this.getWinModalButton() )
        return content
    }

    getWinModalTitle() {
        const title = document.createElement( 'h1' )
        title.innerText = 'You win!'
        return title
    }

    getWinModalTime() {
        this.modalTime = document.createElement( 'p' )
        return this.modalTime
    }

    getWinModalButton() {
        const button = document.createElement( 'button' )
        button.innerText = 'Play again'
        return button
    }
}
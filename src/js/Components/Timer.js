export default class Timer {
    constructor() {
        this.time = 0
    }

    getTimer() {
        const timerContainer = document.createElement( 'div' )
        timerContainer.id = 'timer'

        this.timerSpan = document.createElement( 'span' )
        this.timerSpan.innerText = '00:00'

        const timerIcon = document.createElement( 'i' )
        timerIcon.classList.add( 'gg-timer' )

        timerContainer.append( timerIcon )
        timerContainer.append( this.timerSpan )

        return timerContainer
    }

    start() {
        this.reset()
        this.time-- // To make sure the timer starts at 0
        this.update() // Run directly once to update the timer
        this.tick = setInterval( this.update.bind( this ), 1000 )
    }

    update() {
        this.time++
        this.timerSpan.innerText = this.getTime()
    }

    stop() {
        clearInterval( this.tick )
    }

    reset() {
        this.time = 0
        clearInterval( this.tick )
    }

    getTime() {
        const minutes = Math.floor( this.time / 60 )
        const seconds = this.time % 60 
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
}
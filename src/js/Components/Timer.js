export default class Timer {
    getTimer() {
        const timer = document.createElement( 'div' )
        timer.id = 'timer'
        timer.innerText = '00:00'
        return timer
    }

    startTimer() {
        this.timer = setInterval( this.updateTimer.bind( this ), 1000 )
    }

    updateTimer() {
        const timer = document.getElementById( 'timer' )
        const time = this.getTime()
        timer.innerText = time
    }

    getTime() {
        const time = new Date()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
}
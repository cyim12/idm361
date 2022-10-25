// INFO MODAL
var modal = document.getElementById("infoModal");
var btn = document.getElementById("infoBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// POMODORO
var pomodoroBtns = document.querySelectorAll('.timerButton')
var pomodoroBtn = document.getElementById('addTwentyFive')
var shortBreakBtn = document.getElementById('addFive')
var longBreakBtn = document.getElementById('addTwenty')
var resetBtn = document.getElementById('resetButton')
var startBtn = document.getElementById('startButton')
const countdownTimer = document.getElementById('countdown')

let minutes = 25
let seconds = 60
let pause = true
let pomodoro = "pomodoro"

// event listener for pomodoro buttons
document.addEventListener('click', e => {
    if(!e.target.matches('.timerButton')) return

    // reset when pomodoro button selected
    pause = true
    seconds = 60
    startBtn.innerHTML = "START"

    // only selected button has selected class
    pomodoroBtns.forEach(button => {
        button.classList.remove('selected')
    })
    e.target.classList.add('selected')

    // set timer
    if(e.target.matches('#addTwentyFive')) {
        countdownTimer.innerHTML = '25:00'
        pomodoro = "pomodoro"
        minutes = 25
    } else if(e.target.matches('#addFive')) {
        countdownTimer.innerHTML = '05:00'
        pomodoro = "short break"
        minutes = 5
    } else if(e.target.matches('#addTwenty')) {
        countdownTimer.innerHTML = '20:00'
        pomodoro = "long break"
        minutes = 20
    }
})

// event listener for start button
startBtn.addEventListener('click', () => {
    // if countdown is paused, start/resume countdown, otherwise, pause countdown
    if (pause) {
        startBtn.innerHTML = "PAUSE"
        pause = false
        countdown() 
    } else if (!pause) {
        startBtn.innerHTML = "START"
        pause = true
    }
})

// countdown function
function countdown() {
    // return if countdown is paused
    if(pause) return

    // set minutes and seconds
    let currentMins = minutes - 1
    seconds--
    countdownTimer.innerHTML = (currentMins < 10 ? "0" : "") + currentMins.toString() + ':' + (seconds < 10 ? "0" : "") + String(seconds)

    // count down every second, when a minute is up, countdown one minute
    // when time reaches 0:00, reset
    if(seconds > 0) {
        setTimeout(countdown, 1000);
    } else if(currentMins > 0){
        seconds = 60
        minutes--
        countdown();           
    } else if(currentMins === 0) {
        audio.play()
        reset()        
    }
}
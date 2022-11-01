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
const audio = document.getElementById('audio')

let minutes = 25
let seconds = 60
let pause = true
let reset = false
let pomodoro = "pomodoro"

// EVENT LISTENER FOR POMODORO BUTTONS
document.addEventListener('click', e => {
    if(!e.target.matches('.timerButton')) return

    // reset when pomodoro button selected
    pause = true
    reset = true
    document.getElementById('resetButton').style.backgroundColor = "#BC7F6A"
    document.getElementById('resetButton').style.color = "#F5F0E9"
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
        countdownTimer.innerHTML = '00:05'
        pomodoro = "short break"
        minutes = 1
        seconds = 5
    } else if(e.target.matches('#addTwenty')) {
        countdownTimer.innerHTML = '20:00'
        pomodoro = "long break"
        minutes = 20
    }
})

// EVENT LISTENER FOR RESET BUTTON
resetBtn.addEventListener('click', () => {
    // if countdown is paused, start/resume countdown, otherwise, pause countdown
    if (reset) {
        document.getElementById('resetButton').style.backgroundColor = "#BC7F6A"
        document.getElementById('resetButton').style.color = "#F5F0E9"
        countdownTimer.innerHTML = "00:00"
        reset = true
        pomodoroBtns.forEach(button => {
        button.classList.remove('selected')
        })
        countdown() 
    } else if (!reset) {
        reset = false
        document.getElementById('resetButton').style.backgroundColor = "#F5F0E9"
        document.getElementById('resetButton').style.color = "#BC7F6A"
    }
})


// EVENT LISTENER FOR START BUTTON
startBtn.addEventListener('click', () => {
    // if countdown is paused, start/resume countdown, otherwise, pause countdown
    if (pause) {
        startBtn.innerHTML = "PAUSE"
        document.getElementById('startButton').style.backgroundColor = "#F5F0E9"
        document.getElementById('startButton').style.color = "#6D7A71"
        pause = false
        reset = false
        document.getElementById('resetButton').style.backgroundColor = "#F5F0E9"
        document.getElementById('resetButton').style.color = "#BC7F6A"
        countdown() 
    } else if (!pause) {
        startBtn.innerHTML = "START"
        pause = true
        document.getElementById('startButton').style.backgroundColor = "#6D7A71"
        document.getElementById('startButton').style.color = "#F5F0E9"
        document.getElementById('resetButton').style.backgroundColor = "#BC7F6A"
        document.getElementById('resetButton').style.color = "#F5F0E9"
        reset = true
    }
})

// COUNTDOWN FUNCTION
function countdown() {
    // return if countdown is paused
    if(pause) return

    // set minutes and seconds
    let currentMins = minutes - 1
    seconds--
    countdownTimer.innerHTML = (currentMins < 10 ? "0" : "") + currentMins.toString() + ':' + (seconds < 10 ? "0" : "") + String(seconds)

    if(seconds > 0) {
        setTimeout(countdown, 1000)
        reset = false;
    } else if(currentMins > 0){
        seconds = 60
        minutes--
        countdown();           
    } else if(currentMins === 0) {
        audio.play()
        document.getElementById('timerEndOverlay').style.display = "block"
        reset = true        
    }
}

// TIMER END OVERLAY
var overlay = document.getElementById('timerEndOverlay');
var stopBtn = document.getElementById('stopButton');


stopBtn.onclick = function () {
    overlay.style.display = "none"
    audio.pause ();
    pause = true;
    reset = false;
    pomodoroBtns.forEach(button => {
        button.classList.remove('selected')
    })
    startBtn.innerHTML = "START"
    document.getElementById('startButton').style.backgroundColor = "#6D7A71"
    document.getElementById('startButton').style.color = "#F5F0E9"
}
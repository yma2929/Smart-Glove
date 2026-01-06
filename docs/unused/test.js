let currentTask = 0;
let totalTasks = 4;
let timeLeft = 30;
let timer;
let running = false;

const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const nextBtn = document.getElementById('nextBtn');
const recordingMsg = document.getElementById('recordingMsg');
const progressFill = document.getElementById('progressFill');
const taskButtons = document.querySelectorAll('.task-btn');
const audio = document.getElementById('instructionAudio');

startBtn.onclick = () => {
    startTimer();
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    recordingMsg.classList.remove('hidden');
};

pauseBtn.onclick = () => {
    if (running) {
        clearInterval(timer);
        pauseBtn.innerHTML = "<i class='bx bx-play'></i> Resume";
    } else {
        startTimer();
        pauseBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
    }
    running = !running;
};

nextBtn.onclick = () => {
    markTask("green");
    goToNextTask();
};

document.getElementById('audioBtn').onclick = () => {
    audio.play();
};

function startTimer() {
    running = true;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `00:${timeLeft < 10 ? "0" : ""}${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            finishTask();
        }
    }, 1000);
}

function finishTask() {
    recordingMsg.classList.add('hidden');
    pauseBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
}

function markTask(color) {
    taskButtons[currentTask].classList.add(color);
}

function goToNextTask() {
    currentTask++;
    timeLeft = 30;
    timerEl.textContent = "00:30";
    nextBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');

    progressFill.style.width = `${((currentTask + 1) / totalTasks) * 100}%`;
}

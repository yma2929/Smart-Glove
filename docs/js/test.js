// 1. Task Configuration
const tasks = [
    { 
        title: "Finger Tapping", 
        instructions: "Tap your index finger and thumb together as quickly and widely as possible.", 
        icon: "bx-hand",
        video: "assets/videos/finger-tapping.mp4" 
    },
    { 
        title: "Hand Open / Close", 
        instructions: "Make a tight fist, then fully extend all your fingers. Repeat as fast as possible.", 
        icon: "bx-stop-circle",
        video: "assets/videos/hand-open-close.mp4"
    },
    { 
        title: "Hand Flip", 
        instructions: "Place your hand on your lap. Rapidly flip between palm-up and palm-down.", 
        icon: "bx-refresh",
        video: "assets/videos/hand-flip.mp4"
    }
];

let currentTaskIdx = 0;
let timeLeft = 10;
let timerInterval = null;

// DOM Selectors
const timerEl = document.getElementById('timer');
const taskVideo = document.getElementById('taskVideo');
const videoSource = document.getElementById('videoSource');
const recordingMsg = document.getElementById('recordingMsg');
const waitMsg = document.getElementById('waitMsg');
const progressFill = document.getElementById('progressFill');
const taskCounter = document.getElementById('taskCounter');

/**
 * Loads the task, updates UI, and plays the video tutorial
 */
function loadTask(index) {
    stopTimer();
    const task = tasks[index];
    
    // Update Content
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('taskInstructions').textContent = task.instructions;
    document.getElementById('mainTaskIcon').className = `bx ${task.icon}`;
    
    // Update Progress
    const progress = ((index + 1) / tasks.length) * 100;
    progressFill.style.width = `${progress}%`;
    taskCounter.textContent = `Task ${index + 1} of ${tasks.length}`;

    // Update Media and Play
    videoSource.src = task.video;
    taskVideo.load();
    
    // Browser autoplay policy often requires a user gesture or mute
    taskVideo.play().catch(error => {
        console.log("Autoplay prevented. Showing Play button.", error);
        waitMsg.textContent = "Click video to start tutorial";
    });

    // Reset UI State
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    recordingMsg.classList.add('hidden');
    waitMsg.classList.remove('hidden');
    waitMsg.textContent = "Watch the tutorial to begin...";
    
    updateStatusGrid(index, 'in-progress');
}

/**
 * Event: Video ends -> Start the 10-second test
 */
taskVideo.onended = () => {
    waitMsg.classList.add('hidden');
    startTaskTimer();
};

function startTaskTimer() {
    recordingMsg.classList.remove('hidden');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            stopTimer();
            handleTaskCompletion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

/**
 * Handles logic after the 10-second timer ends
 */
function handleTaskCompletion() {
    updateStatusGrid(currentTaskIdx, 'completed');
    
    if (currentTaskIdx < tasks.length - 1) {
        currentTaskIdx++;
        // 1.5 second pause so the user can breathe before the next video starts
        setTimeout(() => {
            loadTask(currentTaskIdx);
        }, 1500);
    } else {
        showResults();
    }
}

/**
 * Updates the bottom dashboard icons and colors
 */
function updateStatusGrid(index, status) {
    for (let i = 0; i < tasks.length; i++) {
        const el = document.getElementById(`status-${i}`);
        if (!el) continue;

        if (i < index) {
            el.className = "status-item completed";
            el.querySelector('i').className = "bx bx-check-circle";
        } else if (i === index) {
            el.className = `status-item ${status}`;
            el.querySelector('i').className = `bx ${tasks[i].icon} bx-tada`;
        } else {
            el.className = "status-item unstarted";
        }
    }
}

function showResults() {
    document.getElementById('examInterface').classList.add('hidden');
    document.getElementById('topProgress').classList.add('hidden');
    document.getElementById('statusDashboard').classList.add('hidden');
    document.getElementById('resultsInterface').classList.remove('hidden');
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('analysisChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tasks.map(t => t.title),
            datasets: [{
                label: 'Movement Fluidity (%)',
                data: [82, 74, 89],
                borderColor: '#005FB8',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 95, 184, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Initial Kickoff
window.onload = () => {
    loadTask(0);
};
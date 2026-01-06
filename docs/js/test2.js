// // // const tasks = [
// // //     { title: "Finger Tapping", instructions: "Tap your index finger and thumb together as quickly as possible.", icon: "bx-hand" },
// // //     { title: "Hand Open / Close", instructions: "Fully open your hand then make a tight fist repeatedly.", icon: "bx-stop-circle" },
// // //     { title: "Hand Flip", instructions: "Rotate your palm up and down on your lap.", icon: "bx-refresh" },
// // //     { title: "Finger to Nose", instructions: "Touch your nose then extend your arm fully.", icon: "bx-user" }
// // // ];

// // // let currentTaskIdx = 0;
// // // let timeLeft = 30;
// // // let timerInterval = null; 
// // // let isRunning = false;

// // // // DOM Selectors
// // // const timerEl = document.getElementById('timer');
// // // const startBtn = document.getElementById('startBtn');
// // // const pauseBtn = document.getElementById('pauseBtn');
// // // const nextBtn = document.getElementById('nextBtn');
// // // const progressFill = document.getElementById('progressFill');
// // // const taskTitle = document.getElementById('taskTitle');
// // // const taskInstructions = document.getElementById('taskInstructions');
// // // const mainTaskIcon = document.getElementById('mainTaskIcon');
// // // const recordingMsg = document.getElementById('recordingMsg');

// // // /**
// // //  * Updates the status grid at the bottom of the page
// // //  */
// // // function updateStatusUI(index, status) {
// // //     const el = document.getElementById(`status-${index}`);
// // //     if(!el) return;
    
// // //     // Set the class for CSS styling (unstarted, in-progress, completed, etc.)
// // //     el.className = `status-item ${status}`;
    
// // //     // Logic to ensure icons show up correctly
// // //     let iconClass = tasks[index].icon; 
    
// // //     if(status === 'completed') iconClass = 'bx-check-circle';
// // //     if(status === 'in-progress') iconClass = 'bx-loader-alt bx-spin';
// // //     if(status === 'incomplete') iconClass = 'bx-error-circle';
    
// // //     el.querySelector('i').className = `bx ${iconClass}`;
// // // }

// // // /**
// // //  * Clears any running interval to prevent multiple timers running at once
// // //  */
// // // function stopTimer() {
// // //     if (timerInterval) {
// // //         clearInterval(timerInterval);
// // //         timerInterval = null;
// // //     }
// // // }

// // // /**
// // //  * Starts the countdown and handles the recording state
// // //  */
// // // function startTask() {
// // //     isRunning = true;
// // //     startBtn.classList.add('hidden');
// // //     pauseBtn.classList.remove('hidden');
// // //     recordingMsg.classList.remove('hidden');
// // //     updateStatusUI(currentTaskIdx, 'in-progress');
    
// // //     stopTimer();

// // //     timerInterval = setInterval(() => {
// // //         timeLeft--;
// // //         timerEl.textContent = timeLeft;
        
// // //         if (timeLeft <= 0) {
// // //             finishTask();
// // //         }
// // //     }, 1000);
// // // }

// // // startBtn.onclick = () => {
// // //     startTask();
// // // };

// // // /**
// // //  * Handles Pausing and Resuming
// // //  */
// // // pauseBtn.onclick = () => {
// // //     if (isRunning) {
// // //         stopTimer();
// // //         pauseBtn.innerHTML = "<i class='bx bx-play'></i> Resume";
// // //         updateStatusUI(currentTaskIdx, 'incomplete');
// // //         isRunning = false;
// // //     } else {
// // //         pauseBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
// // //         startTask();
// // //     }
// // // };

// // // /**
// // //  * Called when timer hits 0
// // //  */
// // // function finishTask() {
// // //     isRunning = false;
// // //     stopTimer(); 
// // //     recordingMsg.classList.add('hidden');
// // //     pauseBtn.classList.add('hidden');
    
// // //     // Dynamic button text for the final task
// // //     if (currentTaskIdx === tasks.length - 1) {
// // //         nextBtn.innerHTML = "View Results <i class='bx bx-bar-chart-alt-2'></i>";
// // //     } else {
// // //         nextBtn.innerHTML = "Next Task <i class='bx bx-right-arrow-alt'></i>";
// // //     }
    
// // //     nextBtn.classList.remove('hidden');
// // //     updateStatusUI(currentTaskIdx, 'completed');
// // // }

// // // /**
// // //  * Moves to next task or shows final results
// // //  */
// // // nextBtn.onclick = () => {
// // //     if (currentTaskIdx < tasks.length - 1) {
// // //         currentTaskIdx++;
// // //         loadTask(currentTaskIdx);
// // //     } else {
// // //         showResults();
// // //     }
// // // };

// // // /**
// // //  * Resets the UI and timer for a new task
// // //  */
// // // function loadTask(index) {
// // //     stopTimer(); 
// // //     const task = tasks[index];
    
// // //     // Update main display
// // //     taskTitle.textContent = task.title;
// // //     taskInstructions.textContent = task.instructions;
// // //     mainTaskIcon.className = `bx ${task.icon}`;
    
// // //     // UI Resets
// // //     timeLeft = 30; 
// // //     timerEl.textContent = timeLeft;
// // //     nextBtn.classList.add('hidden');
// // //     startBtn.classList.remove('hidden');
// // //     pauseBtn.classList.add('hidden');
// // //     pauseBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
// // //     recordingMsg.classList.add('hidden');
    
// // //     // Sync the bottom status grid icons
// // //     for(let i = 0; i < tasks.length; i++) {
// // //         const item = document.getElementById(`status-${i}`);
// // //         if (!item.classList.contains('completed')) {
// // //              updateStatusUI(i, 'unstarted');
// // //         }
// // //     }
// // //     updateStatusUI(index, 'in-progress');

// // //     // Progress Bar (1-based for visual accuracy)
// // //     const progressPercent = ((index + 1) / tasks.length) * 100;
// // //     progressFill.style.width = `${progressPercent}%`;
// // //     document.getElementById('taskCounter').textContent = `Task ${index + 1} of 4`;
// // // }

// // // /**
// // //  * Hides assessment and renders the Line Chart
// // //  */
// // // function showResults() {
// // //     stopTimer();
// // //     document.getElementById('examInterface').classList.add('hidden');
// // //     document.getElementById('statusDashboard').classList.add('hidden');
// // //     document.getElementById('topProgress').classList.add('hidden');
// // //     document.getElementById('resultsInterface').classList.remove('hidden');

// // //     // Randomized placeholder data
// // //     const scores = [88, 75, 92, 64]; 
// // //     const ctx = document.getElementById('analysisChart').getContext('2d');
    
// // //     new Chart(ctx, {
// // //         type: 'line',
// // //         data: {
// // //             labels: tasks.map(t => t.title),
// // //             datasets: [{
// // //                 label: 'Motor Function Score (%)',
// // //                 data: scores,
// // //                 borderColor: '#005FB8',
// // //                 backgroundColor: 'rgba(0, 95, 184, 0.1)',
// // //                 fill: true,
// // //                 tension: 0.4, 
// // //                 borderWidth: 3,
// // //                 pointRadius: 6,
// // //                 pointBackgroundColor: '#005FB8'
// // //             }]
// // //         },
// // //         options: {
// // //             responsive: true,
// // //             maintainAspectRatio: false,
// // //             scales: { 
// // //                 y: { 
// // //                     beginAtZero: true, 
// // //                     max: 100,
// // //                     title: { display: true, text: 'Score (%)' }
// // //                 }
// // //             }
// // //         }
// // //     });
// // // }

// // // // Kick off the first task on page load
// // // loadTask(0);


// // const tasks = [
// //     { title: "Finger Tapping", instructions: "Tap your index finger and thumb together as quickly as possible.", icon: "bx-hand" },
// //     { title: "Hand Open / Close", instructions: "Fully open your hand then make a tight fist repeatedly.", icon: "bx-stop-circle" },
// //     { title: "Hand Flip", instructions: "Rotate your palm up and down on your lap.", icon: "bx-refresh" },
// //     { title: "Finger to Nose", instructions: "Touch your nose then extend your arm fully.", icon: "bx-user" }
// // ];

// // let currentTaskIdx = 0;
// // let timeLeft = 30;
// // let timerInterval = null; 
// // let isRunning = false;

// // // DOM Selectors
// // const timerEl = document.getElementById('timer');
// // const startBtn = document.getElementById('startBtn');
// // const pauseBtn = document.getElementById('pauseBtn');
// // const nextBtn = document.getElementById('nextBtn');
// // const progressFill = document.getElementById('progressFill');
// // const taskTitle = document.getElementById('taskTitle');
// // const taskInstructions = document.getElementById('taskInstructions');
// // const mainTaskIcon = document.getElementById('mainTaskIcon');
// // const recordingMsg = document.getElementById('recordingMsg');

// // /**
// //  * Updates the status grid at the bottom of the page
// //  * Ensure icons are swapped correctly based on status
// //  */
// // function updateStatusUI(index, status) {
// //     const el = document.getElementById(`status-${index}`);
// //     if(!el) return;
    
// //     el.className = `status-item ${status}`;
    
// //     // Default to the task icon from the array
// //     let iconClass = tasks[index].icon; 
    
// //     // Status-based icon overrides
// //     if(status === 'completed') iconClass = 'bx-check-circle';
// //     if(status === 'in-progress') iconClass = 'bx-loader-alt bx-spin';
// //     if(status === 'incomplete') iconClass = 'bx-error-circle';
    
// //     el.querySelector('i').className = `bx ${iconClass}`;
// // }

// // /**
// //  * Clears the timer safely
// //  */
// // function stopTimer() {
// //     if (timerInterval) {
// //         clearInterval(timerInterval);
// //         timerInterval = null;
// //     }
// // }

// // /**
// //  * Primary task execution logic
// //  */
// // function startTask() {
// //     isRunning = true;
// //     startBtn.classList.add('hidden');
// //     pauseBtn.classList.remove('hidden');
// //     recordingMsg.classList.remove('hidden');
// //     updateStatusUI(currentTaskIdx, 'in-progress');
    
// //     stopTimer();

// //     timerInterval = setInterval(() => {
// //         timeLeft--;
// //         timerEl.textContent = timeLeft;
        
// //         if (timeLeft <= 0) {
// //             finishTask();
// //         }
// //     }, 1000);
// // }

// // startBtn.onclick = () => {
// //     startTask();
// // };

// // /**
// //  * Handle pausing and resuming the motor assessment
// //  */
// // pauseBtn.onclick = () => {
// //     if (isRunning) {
// //         stopTimer();
// //         pauseBtn.innerHTML = "<i class='bx bx-play'></i> Resume";
// //         updateStatusUI(currentTaskIdx, 'incomplete');
// //         isRunning = false;
// //     } else {
// //         pauseBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
// //         startTask();
// //     }
// // };

// // /**
// //  * Handle logic for completing a specific task
// //  */
// // function finishTask() {
// //     isRunning = false;
// //     stopTimer(); 
// //     recordingMsg.classList.add('hidden');
// //     pauseBtn.classList.add('hidden');
    
// //     // Update button text for final assessment stage
// //     if (currentTaskIdx === tasks.length - 1) {
// //         nextBtn.innerHTML = "View Results <i class='bx bx-line-chart'></i>";
// //     } else {
// //         nextBtn.innerHTML = "Next Task <i class='bx bx-right-arrow-alt'></i>";
// //     }
    
// //     nextBtn.classList.remove('hidden');
// //     updateStatusUI(currentTaskIdx, 'completed');
// // }

// // nextBtn.onclick = () => {
// //     if (currentTaskIdx < tasks.length - 1) {
// //         currentTaskIdx++;
// //         loadTask(currentTaskIdx);
// //     } else {
// //         showResults();
// //     }
// // };

// // /**
// //  * Reset interface for the next motor task
// //  * Fixes initial icon visibility for Task 1
// //  */
// // function loadTask(index) {
// //     stopTimer(); 
// //     const task = tasks[index];
    
// //     taskTitle.textContent = task.title;
// //     taskInstructions.textContent = task.instructions;
// //     mainTaskIcon.className = `bx ${task.icon}`;
    
// //     timeLeft = 30; 
// //     timerEl.textContent = timeLeft;
// //     nextBtn.classList.add('hidden');
// //     startBtn.classList.remove('hidden');
// //     pauseBtn.classList.add('hidden');
// //     pauseBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
// //     recordingMsg.classList.add('hidden');
    
// //     // Sync status items and show active hand icon for Finger Tapping
// //     for(let i = 0; i < tasks.length; i++) {
// //         const item = document.getElementById(`status-${i}`);
// //         if (!item.classList.contains('completed')) {
// //              updateStatusUI(i, 'unstarted');
// //         }
// //     }
// //     updateStatusUI(index, 'in-progress');

// //     // Progress percentage update
// //     const progressPercent = ((index + 1) / tasks.length) * 100;
// //     progressFill.style.width = `${progressPercent}%`;
// //     document.getElementById('taskCounter').textContent = `Task ${index + 1} of 4`;
// // }

// // /**
// //  * Render the final line chart analysis
// //  */
// // function showResults() {
// //     stopTimer();
// //     document.getElementById('examInterface').classList.add('hidden');
// //     document.getElementById('statusDashboard').classList.add('hidden');
// //     document.getElementById('topProgress').classList.add('hidden');
// //     document.getElementById('resultsInterface').classList.remove('hidden');

// //     // Dummy performance data for visualization
// //     const scores = [88, 75, 92, 64]; 
// //     const ctx = document.getElementById('analysisChart').getContext('2d');
    
// //     new Chart(ctx, {
// //         type: 'line',
// //         data: {
// //             labels: tasks.map(t => t.title),
// //             datasets: [{
// //                 label: 'Motor Score (%)',
// //                 data: scores,
// //                 borderColor: '#005FB8',
// //                 backgroundColor: 'rgba(0, 95, 184, 0.1)',
// //                 fill: true,
// //                 tension: 0.4, 
// //                 borderWidth: 3,
// //                 pointRadius: 6,
// //                 pointBackgroundColor: '#005FB8'
// //             }]
// //         },
// //         options: {
// //             responsive: true,
// //             maintainAspectRatio: false,
// //             scales: { 
// //                 y: { 
// //                     beginAtZero: true, 
// //                     max: 100,
// //                     title: { display: true, text: 'Score (%)' }
// //                 }
// //             }
// //         }
// //     });
// // }

// // // Initial session start
// // loadTask(0);

// const tasks = [
//     { 
//         title: "Finger Tapping", 
//         instructions: "Tap your index finger and thumb together as quickly as possible.", 
//         icon: "bx-hand",
//         // Sample online audio and gif for testing
//         audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
//         gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ6eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JnFwPScmZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3o7TKVUn7iM8FMEU24/giphy.gif"
//     },
//     { 
//         title: "Hand Open / Close", 
//         instructions: "Fully open your hand then make a tight fist repeatedly.", 
//         icon: "bx-stop-circle",
//         audio: "assets/audio/hand-open-close.mp3",
//         gif: "assets/gifs/hand-open-close.gif"
//     },
//     { 
//         title: "Hand Flip", 
//         instructions: "Rotate your palm up and down on your lap.", 
//         icon: "bx-refresh",
//         audio: "assets/audio/hand-flip.mp3",
//         gif: "assets/gifs/hand-flip.gif"
//     },
//     { 
//         title: "Finger to Nose", 
//         instructions: "Touch your nose then extend your arm fully.", 
//         icon: "bx-user",
//         audio: "assets/audio/finger-to-nose.mp3",
//         gif: "assets/gifs/finger-to-nose.gif"
//     }
// ];

// let currentTaskIdx = 0;
// let timeLeft = 30;
// let timerInterval = null;
// let isRunning = false;

// // Selectors
// const timerEl = document.getElementById('timer');
// const audioPlayer = document.getElementById('instructionAudio');
// const audioBtn = document.getElementById('audioBtn');
// const audioStatus = document.getElementById('audioStatus');
// const taskGif = document.getElementById('taskGif');

// // Audio Logic
// audioBtn.onclick = () => {
//     if (!audioPlayer.src || audioPlayer.src.includes('undefined')) {
//         console.error("Audio source not found!");
//         audioStatus.innerHTML = "<span style='color:red;'>Audio file missing!</span>";
//         return;
//     }
    
//     if (audioPlayer.paused) {
//         audioPlayer.play().catch(e => console.log("Playback blocked by browser or missing file"));
//         audioStatus.innerHTML = "<i class='bx bx-play-circle'></i> Playing instructions...";
//     } else {
//         audioPlayer.pause();
//         audioPlayer.currentTime = 0;
//         audioStatus.innerHTML = "Tap to hear again.";
//     }
// };

// audioPlayer.onended = () => { audioStatus.innerHTML = "Tap to hear again."; };

// // Task Management
// function loadTask(index) {
//     stopTimer();
//     const task = tasks[index];
    
//     // Update Text & Icons
//     document.getElementById('taskTitle').textContent = task.title;
//     document.getElementById('taskInstructions').textContent = task.instructions;
//     document.getElementById('mainTaskIcon').className = `bx ${task.icon}`;
    
//     // Update Media
//     taskGif.src = task.gif;
//     audioPlayer.src = task.audio;
//     audioStatus.innerHTML = "Tap here to hear the instructions read aloud.";

//     // UI Resets
//     timeLeft = 30;
//     timerEl.textContent = timeLeft;
//     document.getElementById('startBtn').classList.remove('hidden');
//     document.getElementById('pauseBtn').classList.add('hidden');
//     document.getElementById('nextBtn').classList.add('hidden');
//     document.getElementById('recordingMsg').classList.add('hidden');
    
//     updateStatusGrid(index);
// }

// function stopTimer() { clearInterval(timerInterval); timerInterval = null; }

// function startTask() {
//     isRunning = true;
//     document.getElementById('startBtn').classList.add('hidden');
//     document.getElementById('pauseBtn').classList.remove('hidden');
//     document.getElementById('recordingMsg').classList.remove('hidden');
    
//     timerInterval = setInterval(() => {
//         timeLeft--;
//         timerEl.textContent = timeLeft;
//         if (timeLeft <= 0) finishTask();
//     }, 1000);
// }

// function finishTask() {
//     stopTimer();
//     document.getElementById('pauseBtn').classList.add('hidden');
//     document.getElementById('nextBtn').classList.remove('hidden');
//     document.getElementById('recordingMsg').classList.add('hidden');
    
//     if (currentTaskIdx === tasks.length - 1) {
//         document.getElementById('nextBtn').innerHTML = "View Results <i class='bx bx-line-chart'></i>";
//     }
// }

// document.getElementById('startBtn').onclick = startTask;
// document.getElementById('nextBtn').onclick = () => {
//     if (currentTaskIdx < tasks.length - 1) {
//         currentTaskIdx++;
//         loadTask(currentTaskIdx);
//     } else {
//         showResults();
//     }
// };

// function updateStatusGrid(index) {
//     for (let i = 0; i < tasks.length; i++) {
//         const el = document.getElementById(`status-${i}`);
//         el.className = `status-item ${i === index ? 'in-progress' : (i < index ? 'completed' : 'unstarted')}`;
//     }
// }

// function showResults() {
//     document.getElementById('examInterface').classList.add('hidden');
//     document.getElementById('resultsInterface').classList.remove('hidden');
//     // Chart rendering logic...
// }

// loadTask(0);

// 1. Task Configuration with TTS Instructions
const tasks = [
    { 
        title: "Finger Tapping", 
        instructions: "Tap your index finger and thumb together as quickly and as widely as possible. Keep a steady rhythm until the timer reaches zero.", 
        icon: "bx-hand",
        gif: "assets/gifs/finger-tapping.gif"
    },
    { 
        title: "Hand Open / Close", 
        instructions: "Make a tight fist, then fully extend all your fingers. Repeat this opening and closing motion as fast as you can.", 
        icon: "bx-stop-circle",
        gif: "assets/gifs/hand-open-close.gif"
    },
    { 
        title: "Hand Flip", 
        instructions: "Place your hand on your lap. Rapidly flip your hand over, alternating between palm-up and palm-down. Keep the movement consistent.", 
        icon: "bx-refresh",
        gif: "assets/gifs/hand-flip.gif"
    },
    { 
        title: "Finger to Nose", 
        instructions: "Start with your arm fully extended. Touch the tip of your nose with your index finger, then return your arm to the fully extended position.", 
        icon: "bx-target-lock",
        gif: "assets/gifs/finger-to-nose.gif"
    }
];

let currentTaskIdx = 0;
let timeLeft = 30;
let timerInterval = null;
let isRunning = false;

// DOM Elements
const timerEl = document.getElementById('timer');
const audioBtn = document.getElementById('audioBtn');
const audioStatus = document.getElementById('audioStatus');
const taskGif = document.getElementById('taskGif');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const nextBtn = document.getElementById('nextBtn');
const recordingMsg = document.getElementById('recordingMsg');

// 2. Text-to-Speech Logic
function speakInstructions() {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const textToSpeak = tasks[currentTaskIdx].instructions;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Clinical settings for clarity
    utterance.rate = 0.85; 
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
        audioStatus.innerHTML = "<i class='bx bx-play-circle bx-tada'></i> Speaking instructions...";
    };

    utterance.onend = () => {
        audioStatus.innerHTML = "Tap here to hear again.";
    };

    window.speechSynthesis.speak(utterance);
}

// 3. Timer & Task Control Logic
function startTask() {
    window.speechSynthesis.cancel(); // Stop speaking when test starts
    isRunning = true;
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    recordingMsg.classList.remove('hidden');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) finishTask();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function finishTask() {
    isRunning = false;
    stopTimer();
    recordingMsg.classList.add('hidden');
    pauseBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    // Update button for final task
    if (currentTaskIdx === tasks.length - 1) {
        nextBtn.innerHTML = "View Results <i class='bx bx-line-chart'></i>";
    }
    
    updateStatusGrid(currentTaskIdx, 'completed');
}

function loadTask(index) {
    window.speechSynthesis.cancel();
    const task = tasks[index];
    
    // Update Content
    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('taskInstructions').textContent = task.instructions;
    document.getElementById('mainTaskIcon').className = `bx ${task.icon}`;
    taskGif.src = task.gif;

    // Reset UI
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    audioStatus.innerHTML = "Tap here to hear the instructions read aloud.";
    
    updateStatusGrid(index, 'in-progress');
}

// 4. Status Dashboard Logic
function updateStatusGrid(index, status) {
    for (let i = 0; i < tasks.length; i++) {
        const el = document.getElementById(`status-${i}`);
        if (i < index) {
            el.className = "status-item completed";
            el.querySelector('i').className = "bx bx-check-circle";
        } else if (i === index) {
            el.className = `status-item ${status}`;
            el.querySelector('i').className = `bx ${tasks[i].icon}`;
        } else {
            el.className = "status-item unstarted";
            el.querySelector('i').className = `bx ${tasks[i].icon}`;
        }
    }
}

// 5. Event Listeners
audioBtn.onclick = speakInstructions;
startBtn.onclick = startTask;

nextBtn.onclick = () => {
    if (currentTaskIdx < tasks.length - 1) {
        currentTaskIdx++;
        loadTask(currentTaskIdx);
    } else {
        showResults();
    }
};

function showResults() {
    document.getElementById('examInterface').classList.add('hidden');
    document.getElementById('topProgress').classList.add('hidden');
    document.getElementById('statusDashboard').classList.add('hidden');
    document.getElementById('resultsInterface').classList.remove('hidden');
    // Your Chart.js code goes here
}

// Initialize
loadTask(0);
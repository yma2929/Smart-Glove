// Internet status
function updateInternet() {
    const status = navigator.onLine ? "Connected" : "Offline";
    document.getElementById("internetStatus").textContent = status;
}

window.addEventListener("online", updateInternet);
window.addEventListener("offline", updateInternet);
updateInternet();

// Mock last test (replace with DB later)
document.getElementById("lastTest").textContent =
    "● Last test: January 5, 2026";
document.getElementById("testDuration").innerHTML =
    "<i class='bx bx-time'></i> Approx. 5 minutes";

// Instructions
function playInstruction() {
    document.getElementById("instructionAudio").play();
}


function setTaskStatus(taskName, status) {
    const task = document.querySelector(`[data-task="${taskName}"] .task-status`);

    task.className = 'task-status';

    if (status === 'done') {
        task.classList.add('bx', 'bx-check-circle');
        task.style.color = '#00c853';
    }
    else if (status === 'pending') {
        task.classList.add('bx', 'bx-time');
        task.style.color = '#ff9800';
    }
    else if (status === 'error') {
        task.classList.add('bx', 'bx-error-circle');
        task.style.color = '#f44336';
    }
}

// Glove Connectivity Simulation
function updateGloveStatus(isConnected) {
    const dot = document.getElementById("gloveDot");
    const statusText = document.getElementById("gloveStatus");
    
    if(isConnected) {
        dot.classList.add("online");
        statusText.textContent = "Connected";
        statusText.style.color = "#28A745";
    } else {
        dot.classList.remove("online");
        statusText.textContent = "Disconnected";
        statusText.style.color = "#DC3545";
    }
}

// Simulate check after 1.5 seconds
setTimeout(() => updateGloveStatus(true), 1500);

// Initialize all tasks as 'pending' for first-time view
const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
taskNames.forEach(name => setTaskStatus(name, 'pending'));
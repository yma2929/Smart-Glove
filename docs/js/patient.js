// ==========================================
// Slow Glove - Patient Dashboard Logic
// ==========================================

/**
 * 1. INITIALIZATION & MOCK DATA
 * Sets up the UI with default values and status indicators.
 */
document.getElementById("lastTest").textContent = "● Last test: January 5, 2026";
document.getElementById("testDuration").innerHTML = "<i class='bx bx-time'></i> Approx. 5 minutes";

// Initialize all tasks as 'pending' for the first-time view
const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
taskNames.forEach(name => setTaskStatus(name, 'pending'));

// Simulate glove connecting after 1.5 seconds
setTimeout(() => updateGloveStatus(true), 1500);


/**
 * 2. GLOVE CONNECTIVITY UI
 * Updates the visual dot and text based on hardware connection.
 */
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


/**
 * 3. TASK STATUS MANAGEMENT
 * Changes the icon and color of task items (pending, done, error).
 */
function setTaskStatus(taskName, status) {
    const task = document.querySelector(`[data-task="${taskName}"] .task-status`);
    if (!task) return;

    task.className = 'task-status'; // Reset classes

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


/**
 * 4. START TEST ACTION
 * Triggers the API for hardware and navigates to the assessment page.
 */
document.getElementById("startTestBtn").addEventListener("click", async () => {
    const startBtn = document.getElementById("startTestBtn");
    const isHardwareConnected = false; // Set to TRUE when you plug in the glove

    startBtn.innerText = "Starting...";
    startBtn.disabled = true;

    if (!isHardwareConnected) {
        // --- MOCK BEHAVIOR ---
        console.warn("Running in Mock Mode: Bypassing hardware check.");
        setTimeout(() => {
            window.location.href = "./testTest.html";
        }, 800); // Small delay to simulate a real request
        return;
    }

    // --- REAL HARDWARE BEHAVIOR ---
    try {
        const response = await fetch("http://192.168.1.12:3500/api/start-test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patient_id: "P001" })
        });

        if (!response.ok) throw new Error("Server error");
        window.location.href = "./testTest.html";
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Hardware not found. Switch to Mock Mode in code to test UI.");
        startBtn.innerText = "Start Today’s Test";
        startBtn.disabled = false;
    }
});


/**
 * 5. UTILITIES (Optional)
 * Audio instruction support.
 */
function playInstruction() {
    const audio = document.getElementById("instructionAudio");
    if (audio) audio.play();
}
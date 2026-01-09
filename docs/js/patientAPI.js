// --- API Integration ---
async function fetchPatientData() {
    try {
        const response = await fetch('http://localhost:3500/api/v1/tests');
        const data = await response.json();

        if (data.length > 0) {
            const latestTest = data[0]; // The latest test due to "ORDER BY test_date DESC"
            
            // Update "Last Test" date
            const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(latestTest.test_date).toLocaleDateString(undefined, dateOptions);
            document.getElementById("lastTest").textContent = `● Last test: ${formattedDate}`;

            // Update "Duration"
            const durationMin = Math.round(latestTest.test_duration_seconds / 60);
            document.getElementById("testDuration").innerHTML = 
                `<i class='bx bx-time'></i> Approx. ${durationMin} minutes`;

            // If a test was done today, mark tasks as 'done'
            const isToday = new Date(latestTest.test_date).toDateString() === new Date().toDateString();
            if (isToday) {
                taskNames.forEach(name => setTaskStatus(name, 'done'));
            }
        }
    } catch (error) {
        console.error("Error fetching from API:", error);
    }
}

// Keep your existing Internet status logic
function updateInternet() {
    const status = navigator.onLine ? "Connected" : "Offline";
    document.getElementById("internetStatus").textContent = status;
}

window.addEventListener("online", updateInternet);
window.addEventListener("offline", updateInternet);
updateInternet();

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

const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
taskNames.forEach(name => setTaskStatus(name, 'pending'));

// Call API on load
fetchPatientData(); 
setTimeout(() => updateGloveStatus(true), 1500);
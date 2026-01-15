// --- Configuration ---
// Set this ID to match the patient for this dashboard (e.g., PID-001 for John Smith)
const CURRENT_PATIENT_ID = "PID-001"; 

// --- API Integration ---
async function fetchPatientData() {
    try {
        const response = await fetch('http://localhost:3500/api/v1/tests');
        const allData = await response.json();

        // Filter the results to only show tests belonging to THIS patient
        const patientTests = allData.filter(test => test.patient_id === CURRENT_PATIENT_ID);

        if (patientTests.length > 0) {
            const latestTest = patientTests[0]; // The latest test for this specific patient
            
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
        } else {
            // Optional: Handle case where patient has no tests yet
            document.getElementById("lastTest").textContent = `● No tests recorded yet`;
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

// Initialize Task Status
// Note: Ensure setTaskStatus is defined in your environment (it was in your previous snippet)
const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
if (typeof setTaskStatus === 'function') {
    taskNames.forEach(name => setTaskStatus(name, 'pending'));
}

// Call API on load
fetchPatientData(); 

// Check for updates every 30 seconds to see if the Hardware sent new data
setInterval(fetchPatientData, 30000);

setTimeout(() => updateGloveStatus(true), 1500);
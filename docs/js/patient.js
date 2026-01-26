// // Internet status
// function updateInternet() {
//     const status = navigator.onLine ? "Connected" : "Offline";
//     document.getElementById("internetStatus").textContent = status;
// }

// window.addEventListener("online", updateInternet);
// window.addEventListener("offline", updateInternet);
// updateInternet();

// // Mock last test (replace with DB later)
// document.getElementById("lastTest").textContent =
//     "● Last test: January 5, 2026";
// document.getElementById("testDuration").innerHTML =
//     "<i class='bx bx-time'></i> Approx. 5 minutes";

// // Instructions
// function playInstruction() {
//     document.getElementById("instructionAudio").play();
// }


// function setTaskStatus(taskName, status) {
//     const task = document.querySelector(`[data-task="${taskName}"] .task-status`);

//     task.className = 'task-status';

//     if (status === 'done') {
//         task.classList.add('bx', 'bx-check-circle');
//         task.style.color = '#00c853';
//     }
//     else if (status === 'pending') {
//         task.classList.add('bx', 'bx-time');
//         task.style.color = '#ff9800';
//     }
//     else if (status === 'error') {
//         task.classList.add('bx', 'bx-error-circle');
//         task.style.color = '#f44336';
//     }
// }

// // Glove Connectivity Simulation
// function updateGloveStatus(isConnected) {
//     const dot = document.getElementById("gloveDot");
//     const statusText = document.getElementById("gloveStatus");
    
//     if(isConnected) {
//         dot.classList.add("online");
//         statusText.textContent = "Connected";
//         statusText.style.color = "#28A745";
//     } else {
//         dot.classList.remove("online");
//         statusText.textContent = "Disconnected";
//         statusText.style.color = "#DC3545";
//     }
// }

// // Simulate check after 1.5 seconds
// setTimeout(() => updateGloveStatus(true), 1500);

// // Initialize all tasks as 'pending' for first-time view
// const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
// taskNames.forEach(name => setTaskStatus(name, 'pending'));





// document.getElementById("startTestBtn").addEventListener("click", async () => {
//   try {
//     // 1️⃣ Trigger hardware via API
//     const response = await fetch("http://192.168.1.12:3500/api/start-test", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         patient_id: "P001"
//       })
//     });

//     if (!response.ok) {
//       throw new Error("Failed to start test");
//     }

//     // 2️⃣ Navigate AFTER success
//     window.location.href = "./test2.html";

//   } catch (error) {
//     console.error(error);
//     alert("Unable to start test. Please try again.");
//   }
// });

// const startBtn = document.getElementById("startTestBtn");
// const modal = document.getElementById("medicationModal");
// const confirmBtn = document.getElementById("confirmMedication");
// const cancelBtn = document.getElementById("cancelMedication");
// const medicationInput = document.getElementById("medicationDate");

// // 1️⃣ When Start Test is clicked → show question
// startBtn.addEventListener("click", () => {
//   modal.classList.remove("hidden");
// });

// // 2️⃣ Cancel → close modal
// cancelBtn.addEventListener("click", () => {
//   modal.classList.add("hidden");
// });

// 3️⃣ Confirm → validate date → call API → navigate
// confirmBtn.addEventListener("click", async () => {
//   const medicationDate = medicationInput.value;

//   if (!medicationDate) {
//     alert("Please select the medication date before continuing.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3500/api/start-test", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         patient_id: "P001",
//         last_medication_date: medicationDate
//       })
//     });

//     if (!response.ok) {
//       throw new Error("Failed to start test");
//     }

//     // Optional: store locally if needed later
//     localStorage.setItem("lastMedicationDate", medicationDate);

//     // Navigate AFTER everything succeeds
//     window.location.href = "./test2.html";

//   } catch (err) {
//     console.error(err);
//     alert("Server error. Please try again.");
//   }
// });



// =========================
// Patient Test Script
// =========================

// Glove & Internet Status

// Optional: Internet status check
// function updateInternet() {
//     const status = navigator.onLine ? "Connected" : "Offline";
//     document.getElementById("internetStatus").textContent = status;
// }
// window.addEventListener("online", updateInternet);
// window.addEventListener("offline", updateInternet);
// updateInternet();

// Mock last test info (replace with DB later)
document.getElementById("lastTest").textContent =
    "● Last test: January 5, 2026";
document.getElementById("testDuration").innerHTML =
    "<i class='bx bx-time'></i> Approx. 5 minutes";

// Instructions audio
function playInstruction() {
    document.getElementById("instructionAudio").play();
}

// =========================
// Task Status Handling
// =========================
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

// Initialize all tasks as 'pending' for first-time view
const taskNames = ['finger_tapping', 'hand_open_close', 'hand_flip', 'finger_to_nose'];
taskNames.forEach(name => setTaskStatus(name, 'pending'));

// =========================
// Glove Connectivity Simulation
// =========================
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

// Simulate glove connecting after 1.5 seconds
setTimeout(() => updateGloveStatus(true), 1500);

// =========================
// Start Test Button Logic
// =========================
document.getElementById("startTestBtn").addEventListener("click", async () => {
    try {
        // Trigger hardware/test via API
        const response = await fetch("http://192.168.1.12:3500/api/start-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                patient_id: "P001"
            })
        });

        if (!response.ok) {
            throw new Error("Failed to start test");
        }

        // Navigate to test page after successful trigger
        window.location.href = "./test2.html";

    } catch (error) {
        console.error(error);
        alert("Unable to start test. Please try again.");
    }
});

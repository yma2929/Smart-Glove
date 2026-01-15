// // --- NEW: Add this to your showResults function ---
// async function showResults() {
//     document.getElementById('examInterface').classList.add('hidden');
//     document.getElementById('topProgress').classList.add('hidden');
//     document.getElementById('statusDashboard').classList.add('hidden');
//     document.getElementById('resultsInterface').classList.remove('hidden');

//     // 1. Prepare the data payload for the API
//     const testData = {
//         patient_name: "Current Patient", // In a real app, get this from login/session
//         patient_id: "PID-2026",
//         test_score: Math.floor(Math.random() * 40) + 60, // Placeholder score until AI integration
//         test_duration: 120, // 4 tasks x 30 seconds
//         test_date: new Date().toISOString()
//     };

//     // 2. POST the data to your Node.js API
//     try {
//         const response = await fetch('http://localhost:3500/api/v1/tests', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(testData)
//         });

//         if (response.ok) {
//             console.log("Assessment data saved to database successfully.");
//         }
//     } catch (error) {
//         console.error("Failed to save results:", error);
//     }

//     // 3. Render the Analysis Chart
//     renderAnalysisChart();
// }

// function renderAnalysisChart() {
//     const ctx = document.getElementById('analysisChart').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
//             datasets: [{
//                 label: 'Performance Score',
//                 data: [85, 72, 90, 78], // Placeholder until AI feedback arrives
//                 backgroundColor: '#005FB8'
//             }]
//         },
//         options: { responsive: true }
//     });
// }


// --- NEW: Add this to your showResults function ---
async function showResults() {
    document.getElementById('examInterface').classList.add('hidden');
    document.getElementById('topProgress').classList.add('hidden');
    document.getElementById('statusDashboard').classList.add('hidden');
    document.getElementById('resultsInterface').classList.remove('hidden');

    // 1. Define which patient is currently taking the test [cite: 1.2]
    const activePatientId = "PID-001"; 

    // 2. Prepare the data payload (Hardware Metrics only) [cite: 1.1, 1.2]
    // Note: patient_name and patient_id are now handled via the URL and Server-side mapping
    const testData = {
        test_score: Math.floor(Math.random() * 40) + 60, // Placeholder score until AI integration
        test_duration: 120 // 4 tasks x 30 seconds
    };

    // 3. POST the data using the URL Parameter pattern [cite: 1.2, 4.2]
    try {
        const response = await fetch(`http://localhost:3500/api/v1/tests/${activePatientId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(`Success: ${result.message}`);
        } else {
            console.error(`Server Error: ${result.error}`);
        }
    } catch (error) {
        console.error("Connection Failed: Ensure server.js is running.", error);
    }

    // 4. Render the Analysis Chart
    renderAnalysisChart();
}

function renderAnalysisChart() {
    const ctx = document.getElementById('analysisChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
            datasets: [{
                label: 'Performance Score',
                data: [85, 72, 90, 78], // Placeholder until AI feedback arrives
                backgroundColor: '#005FB8'
            }]
        },
        options: { 
            responsive: true,
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}
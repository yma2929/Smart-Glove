// // --- NEW: Dynamic Data Loading ---
// let patientData = {}; // We will fill this from the DB

// async function fetchAllClinicalData() {
//     try {
//         const response = await fetch('http://localhost:3500/api/v1/tests');
//         const rawData = await response.json();

//         // Group the flat list of tests by Patient Name
//         patientData = rawData.reduce((acc, test) => {
//             if (!acc[test.patient_name]) {
//                 acc[test.patient_name] = {
//                     age: 70, // Placeholder: age should eventually be in a 'patients' table
//                     id: test.patient_id,
//                     tests: 0,
//                     last: "",
//                     trend: "Stable",
//                     rate: "85%", // Placeholder: calculate based on frequency
//                     status: "Good",
//                     lineData: [],
//                     notes: [] // These should eventually come from a 'notes' table
//                 };
//             }
            
//             acc[test.patient_name].tests += 1;
//             acc[test.patient_name].lineData.push(test.test_score);
            
//             // Set the most recent date as the "last" test
//             if (!acc[test.patient_name].last) {
//                 acc[test.patient_name].last = new Date(test.test_date).toLocaleDateString();
//             }
            
//             return acc;
//         }, {});

//         // After data is processed, render the sidebar and first patient
//         const firstPatient = Object.keys(patientData)[0];
//         if (firstPatient) {
//             renderSidebar();
//             loadPatient(firstPatient);
//         }
//     } catch (error) {
//         console.error("Clinical Fetch Error:", error);
//     }
// }

// // Update window.onload to use the new fetch
// window.onload = () => {
//     initMainCharts();
//     fetchAllClinicalData(); 
//     setupEventListeners();
// // };// 1. GLOBAL VARIABLES









// let patientData = {}; 
// let activePatient = "";

// // 2. THE FETCH METHOD
// async function fetchAllClinicalData() {
//     try {
//         const response = await fetch('http://localhost:3500/api/v1/tests');
//         const rawData = await response.json();

//         // Logic to group raw rows into the patientData object
//         patientData = rawData.reduce((acc, test) => {
//             if (!acc[test.patient_name]) {
//                 acc[test.patient_name] = {
//                     id: test.patient_id,
//                     tests: 0,
//                     last: new Date(test.test_date).toLocaleDateString(),
//                     lineData: [],
//                     notes: [] 
//                 };
//             }
//             acc[test.patient_name].tests += 1;
//             acc[test.patient_name].lineData.push(test.test_score);
//             return acc;
//         }, {});

//         // Initial UI Render
//         const names = Object.keys(patientData);
//         if (names.length > 0) {
//             activePatient = names[0];
//             renderSidebar();
//             loadPatient(activePatient);
//         }
//     } catch (error) {
//         console.error("Clinical Fetch Error:", error);
//     }
// }

// // 3. THE INITIALIZATION TRIGGER
// window.onload = () => {
//     initMainCharts();       // Initialize Chart.js objects first
//     fetchAllClinicalData(); // Then fill them with real data from the API
//     setupEventListeners();
// };



/**
 * 1. Global State
 * Stores aggregated patient data and tracks the currently selected profile.
 */
let patientData = {}; 
let activePatient = "";
let mainLineChart = null;

/**
 * 2. Data Fetching & Aggregation
 * Fetches every record from the API and groups them by patient name.
 */
async function fetchAllClinicalData() {
    try {
        const response = await fetch('http://localhost:3500/api/v1/tests');
        const rawData = await response.json();

        // Organize the flat list of tests into a nested object grouped by patient_name
        patientData = rawData.reduce((acc, test) => {
            if (!acc[test.patient_name]) {
                acc[test.patient_name] = {
                    id: test.patient_id || "Glove-N/A",
                    tests: 0,
                    // Store the most recent test date as the primary "Last Assessment" date
                    last: new Date(test.test_date).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                    }),
                    lineData: [], // Stores scores for the trend chart
                    status: "Stable", // Default status
                    rate: "85%"       // Placeholder completion rate
                };
            }
            acc[test.patient_name].tests += 1;
            acc[test.patient_name].lineData.push(test.test_score);
            return acc;
        }, {});

        // Update the top stat cards (Total Patients, Active Today)
        updateOverviewStats(rawData);
        
        // Render the sidebar list
        renderSidebar();

        // Auto-load the first patient in the list if none is active
        const names = Object.keys(patientData);
        if (names.length > 0 && !activePatient) {
            activePatient = names[0];
            loadPatient(activePatient);
        }
    } catch (error) {
        console.error("Clinical Fetch Error:", error);
    }
}

/**
 * 3. Update Stat Cards
 * Calculates top-level metrics for the entire clinic.
 */
function updateOverviewStats(rawData) {
    const totalPatients = Object.keys(patientData).length;
    
    // Calculate "Active Today" (tests conducted in the last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const activeToday = rawData.filter(test => new Date(test.test_date) > twentyFourHoursAgo).length;

    // Update the UI h3 elements (Order based on your HTML structure)
    const statValues = document.querySelectorAll('.stat-card h3');
    if (statValues[0]) statValues[0].innerText = totalPatients;
    if (statValues[1]) statValues[1].innerText = activeToday;
}

/**
 * 4. UI Rendering Functions
 */
function renderSidebar() {
    const list = document.getElementById('sidebarList');
    if (!list) return;
    list.innerHTML = "";

    Object.keys(patientData).forEach(name => {
        const p = patientData[name];
        const card = document.createElement('div');
        
        card.className = `patient-item ${name === activePatient ? 'active' : ''}`;
        card.onclick = () => loadPatient(name);
        
        card.innerHTML = `
            <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${name}</strong> 
                <i class='bx bx-minus text-blue'></i>
            </div>
            <small class="metadata" style="color: #64748b; font-size: 14px;">ID: ${p.id} • ${p.tests} tests</small>
            <div class="mini-progress-bar" style="height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px; overflow: hidden;">
                <div class="fill" style="width: ${p.rate}; height: 100%; background: #14b8a6;"></div>
            </div>
        `;
        list.appendChild(card);
    });
}

function loadPatient(name) {
    activePatient = name;
    const data = patientData[name];

    // Update Profile Meta
    document.getElementById('activeName').innerText = name;
    document.getElementById('activeMeta').innerText = `Patient ID: ${data.id} • Total Tests: ${data.tests}`;
    
    // Update Quick Stats Boxes
    document.getElementById('trendTxt').innerText = data.status;
    document.getElementById('lastTxt').innerText = data.last;
    document.getElementById('rateTxt').innerText = data.rate;

    // Refresh Sidebar to update active class
    renderSidebar();

    // Update the Performance Chart
    // Reverse lineData because it's collected newest-to-oldest, but Chart needs oldest-to-newest
    const chronologicalScores = [...data.lineData].reverse().slice(-7); 
    updateMainLineChart(chronologicalScores);
}

/**
 * 5. Chart Management
 */
function initMainCharts() {
    const ctxLine = document.getElementById('mainLineChart');
    if (ctxLine) {
        mainLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Latest'],
                datasets: [{ 
                    label: 'Overall Performance', 
                    data: [], 
                    borderColor: '#14b8a6', 
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                    tension: 0.4, 
                    fill: true 
                }]
            },
            options: { 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } }, 
                scales: { y: { min: 0, max: 100 } } 
            }
        });
    }
}

function updateMainLineChart(newData) {
    if (mainLineChart) {
        mainLineChart.data.datasets[0].data = newData;
        mainLineChart.update();
    }
}

/**
 * 6. Event Listeners & Initialization
 */
function setupEventListeners() {
    const searchInput = document.getElementById('patientSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.patient-item').forEach(card => {
                const name = card.querySelector('strong').innerText.toLowerCase();
                card.style.display = name.includes(term) ? 'block' : 'none';
            });
        });
    }
}

window.onload = () => {
    initMainCharts();
    fetchAllClinicalData();
    setupEventListeners();

    // Auto-refresh the clinical data every 30 seconds
    setInterval(fetchAllClinicalData, 30000);
};
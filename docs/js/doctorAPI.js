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
// };// 1. GLOBAL VARIABLES
let patientData = {}; 
let activePatient = "";

// 2. THE FETCH METHOD
async function fetchAllClinicalData() {
    try {
        const response = await fetch('http://localhost:3500/api/v1/tests');
        const rawData = await response.json();

        // Logic to group raw rows into the patientData object
        patientData = rawData.reduce((acc, test) => {
            if (!acc[test.patient_name]) {
                acc[test.patient_name] = {
                    id: test.patient_id,
                    tests: 0,
                    last: new Date(test.test_date).toLocaleDateString(),
                    lineData: [],
                    notes: [] 
                };
            }
            acc[test.patient_name].tests += 1;
            acc[test.patient_name].lineData.push(test.test_score);
            return acc;
        }, {});

        // Initial UI Render
        const names = Object.keys(patientData);
        if (names.length > 0) {
            activePatient = names[0];
            renderSidebar();
            loadPatient(activePatient);
        }
    } catch (error) {
        console.error("Clinical Fetch Error:", error);
    }
}

// 3. THE INITIALIZATION TRIGGER
window.onload = () => {
    initMainCharts();       // Initialize Chart.js objects first
    fetchAllClinicalData(); // Then fill them with real data from the API
    setupEventListeners();
};
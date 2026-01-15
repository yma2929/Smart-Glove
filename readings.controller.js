// // controllers/readings.controller.js
// const pool = require('../config/db');

// exports.createReading = async (req, res) => {
//   try {
//     const { temperature, humidity, device_id } = req.body;

//     await pool.query(
//       'INSERT INTO readings (temperature, humidity, device_id) VALUES (?, ?, ?)',
//       [temperature, humidity, device_id]
//     );

//     res.status(201).json({ message: 'Reading saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to save reading' });
//   }
// };

// exports.getReadings = async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM readings');
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch readings' });
//   }
// };



// // This represents the ID you "placed" for this specific dashboard view
// const CURRENT_PATIENT_ID = "PID-001"; 

// async function fetchMyData() {
//     try {
//         const response = await fetch('http://localhost:3500/api/v1/tests');
//         const allTests = await response.json();

//         // Filter for only the ID we "placed" on this page
//         const myTests = allTests.filter(t => t.patient_id === CURRENT_PATIENT_ID);

//         if (myTests.length > 0) {
//             const latest = myTests[0];
            
//             // Update the UI with the Hardware Data
//             document.getElementById("lastTest").textContent = 
//                 `● Last test: ${new Date(latest.test_date).toLocaleDateString()}`;
            
//             const durationMin = Math.round(latest.test_duration_seconds / 60);
//             document.getElementById("testDuration").innerHTML = 
//                 `<i class='bx bx-time'></i> Approx. ${durationMin} minutes`;
                
//             // Update Chart (Assuming renderChart is defined in your progress-chart.js)
//             if (window.updateDashboardChart) {
//                 window.updateDashboardChart(myTests.slice(0, 5).reverse());
//             }
//         }
//     } catch (error) {
//         console.error("Error connecting to your API:", error);
//     }
// }

// // Check for new hardware data every 10 seconds
// setInterval(fetchMyData, 10000);
// window.onload = fetchMyData;















// import requests

// # Set the ID for the patient currently wearing the glove
// PATIENT_ID = "PID-001" 
// API_URL = f"http://<YOUR_COMPUTER_IP>:3500/api/v1/tests/{PATIENT_ID}"

// def send_results(score, duration):
//     # Notice: No name or ID in this dictionary!
//     payload = {
//         "test_score": score,
//         "test_duration": duration
//     }
    
//     try:
//         response = requests.post(API_URL, json=payload)
//         print(f"Status: {response.status_code}, Response: {response.json()}")
//     except Exception as e:
//         print(f"Connection Failed: {e}")

// # Example: AI model finished analysis
// send_results(82.5, 35)
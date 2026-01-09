// API ADDRESS: http://192.168.1.12:3500/api/v1/tests


const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3500;

// Middleware
app.use(cors());
app.use(express.json());

// --- 1. DATABASE CONNECTION ---
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: '', 
  database: 'gloves_table'
}).promise();

// --- 2. ROOT TEST ROUTE ---
app.get('/', (req, res) => {
    res.send("<h1>Server is Running!</h1><p>API Endpoint: <a href='/api/v1/tests'>/api/v1/tests</a></p>");
});

// --- 3. RECEIVE & STORE DATA (For Hardware Team) ---
// This is the implementation that saves data to the DB
// app.post('/api/v1/tests', async (req, res) => {
//     const { patient_name, patient_id, test_score, test_duration, test_date } = req.body;

//     try {
//         const query = `
//             INSERT INTO glove_tests 
//             (patient_name, patient_id, test_score, test_duration_seconds, test_date) 
//             VALUES (?, ?, ?, ?, ?)`;
        
//         await pool.execute(query, [
//             patient_name, 
//             patient_id, 
//             test_score, 
//             test_duration, 
//             test_date || new Date() 
//         ]);

//         console.log(`Successfully saved test for: ${patient_name}`);
//         res.status(201).json({ message: "Test results saved successfully" });
//     } catch (err) {
//         console.error("DB Error:", err);
//         res.status(500).json({ error: "Failed to save test data" });
//     }
// });
app.post('/api/v1/tests', async (req, res) => {
    // Check if body exists before trying to use it
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No data provided in request body" });
    }

    const { patient_name, patient_id, test_score, test_duration, test_date } = req.body;

    try {
        const query = `
            INSERT INTO glove_tests 
            (patient_name, patient_id, test_score, test_duration_seconds, test_date) 
            VALUES (?, ?, ?, ?, ?)`;
        
        await pool.execute(query, [
            patient_name, 
            patient_id, 
            test_score, 
            test_duration, 
            test_date || new Date() 
        ]);

        res.status(201).json({ message: "Test results saved successfully" });
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// --- 4. RETRIEVE DATA (For Your Frontend) ---
app.get('/api/v1/tests', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM glove_tests ORDER BY test_date DESC');
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Could not fetch data from database" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API active at http://localhost:${PORT}`);
});
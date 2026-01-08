const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3500;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: '', 
  port:3500,
  database: 'smart_glove_db'
}).promise();

// --- RECEIVE TEST DATA FROM RASPBERRY PI ---
app.post('/api/v1/tests', async (req, res) => {
    // Destructuring the specific data you need
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
            test_date || new Date() // Use provided date or current date
        ]);

        res.status(201).json({ message: "Test results saved successfully" });
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: "Failed to save test data" });
    }
});

// --- SEND DATA TO YOUR FRONTEND ---
app.get('/api/v1/tests', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM glove_tests ORDER BY test_date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


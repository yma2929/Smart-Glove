// API ADDRESS: http://192.168.1.12:3500/api/v1/tests/101

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3500;

// CORS
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("FROM:", req.ip);
  console.log("METHOD:", req.method);
  console.log("BODY:", req.body);
  next();
});


// Static files
app.use("/", express.static("docs"));

// Database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gloves_table'
}).promise();


app.post('/api/sensor-data', async (req, res) => {
try {
const {
patient_id,
flex_thumb, flex_index, flex_middle,
accel_x, accel_y, accel_z,
amplitude, frequency, speed,
tremor, regularity, stops, score,
battery_level
} = req.body;

if (!patient_id) {
return res.status(400).json({ error: "Missing patient_id" });
}

const query = `
INSERT INTO glove_tests (
patient_id, flex_thumb, flex_index, flex_middle,
accel_x, accel_y, accel_z,
amplitude, frequency, speed,
tremor, regularity, stops, score,
battery_level, timestamp
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
`;

const values = [
patient_id,
flex_thumb, flex_index, flex_middle,
accel_x, accel_y, accel_z,
amplitude, frequency, speed,
tremor, regularity, stops, score,
battery_level
];

await pool.query(query, values);

res.status(201).json({
status: "success",
message: "All 15 metrics recorded successfully"
});
} catch (err) {
res.status(500).json({ error: "Database insertion failed" });
}
});

app.get('/api/v1/tests', async (req, res) => {
try {
const [rows] = await pool.query(
'SELECT * FROM glove_tests ORDER BY timestamp DESC'
);

res.status(200).json({
status: "success",
count: rows.length,
data: rows
});
} catch (err) {
res.status(500).json({ error: "Failed to fetch sensor logs" });
}
});

app.get('/api/v1/tests/:patient_id', async (req, res) => {
try {
const { patient_id } = req.params;

const [rows] = await pool.query(
'SELECT * FROM glove_tests WHERE patient_id = ? ORDER BY timestamp DESC',
[patient_id]
);

if (rows.length === 0) {
return res.status(404).json({ error: "No data found for this patient" });
}

res.status(200).json({
status: "success",
patient_id,
count: rows.length,
data: rows
});
} catch (err) {
res.status(500).json({ error: "Failed to fetch patient data" });
}
});

app.get('/', (req, res) => {
res.send(`
<h1>Smart Glove API is Running</h1>
<ul>
<li>POST /api/sensor-data</li>
<li>GET /api/v1/tests</li>
<li>GET /api/v1/tests/:patient_id</li>
</ul>
`);
});



//CODE FOR STARTING A TEST SESSION
let testState = {
  active: false,
  patient_id: null
};

app.post("/api/start-test", (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: "Missing patient_id" });
  }

  testState.active = true;
  testState.patient_id = patient_id;

  console.log("Test started for:", patient_id);

  res.json({
    status: "success",
    message: "Test started",
    patient_id
  });
});

// Endpoint to check test status
app.get("/api/test-status", (req, res) => {
  res.json(testState);
});


app.post("/api/test-started", (req, res) => {
  testState.active = false;
  res.json({ status: "acknowledged" });
});


// app.listen(PORT, () => {
// console.log(`Server running on http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


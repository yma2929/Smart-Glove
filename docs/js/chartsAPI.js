// Inside your renderChart function
const scores = recentTests.map(t => t.test_score);
const tremorLevels = recentTests.map(t => t.ai_tremor_severity);

new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Test Score',
                data: scores,
                borderColor: '#005FB8',
                yAxisID: 'y', // Primary axis
            },
            {
                label: 'AI Detected Tremor',
                data: tremorLevels,
                borderColor: '#FF4B2B', // Different color for AI data
                yAxisID: 'y1', // Secondary axis
            }
        ]
    },
    options: {
        scales: {
            y: { type: 'linear', position: 'left' },
            y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } }
        }
    }
});


//server code 
app.post('/api/v1/tests', async (req, res) => {
    // Adding the AI fields provided by the hardware team
    const { patient_id, test_score, ai_tremor_severity, ai_smoothness_score } = req.body;

    try {
        const query = `INSERT INTO glove_tests (patient_id, test_score, ai_tremor_severity, ai_smoothness_score) VALUES (?, ?, ?, ?)`;
        await pool.execute(query, [patient_id, test_score, ai_tremor_severity, ai_smoothness_score]);
        res.status(201).json({ message: "AI Analysis saved" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save AI data" });
    }
});

// //db 
// ALTER TABLE glove_tests 
// ADD COLUMN ai_tremor_severity FLOAT,
// ADD COLUMN ai_smoothness_score FLOAT;
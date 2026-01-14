// controllers/readings.controller.js
const pool = require('../config/db');

exports.createReading = async (req, res) => {
  try {
    const { temperature, humidity, device_id } = req.body;

    await pool.query(
      'INSERT INTO readings (temperature, humidity, device_id) VALUES (?, ?, ?)',
      [temperature, humidity, device_id]
    );

    res.status(201).json({ message: 'Reading saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save reading' });
  }
};

exports.getReadings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM readings');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
};

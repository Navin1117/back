const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
 
  database: 'portfolio' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API route to handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, phone, subject } = req.body;

  // SQL query to insert the contact data
  const sql = 'INSERT INTO contacts (name, email, phone, subject) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, subject], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving contact data' });
    }
    res.status(200).json({ message: 'Contact saved successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

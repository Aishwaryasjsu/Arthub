// app.js

const express = require('express');
const app = express();
const pool = require('./config/db');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a route to handle the signup form data
app.post('/signup', (req, res) => {
  const { username, password, email, isSeller } = req.body;

  // Check if username, password, and email are provided
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }

  // Insert the data into the database
  pool.query(
    'INSERT INTO Users (username, password, email, isSeller) VALUES (?, ?, ?, ?)',
    [username, hashedPassword, email, isSeller],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Something went wrong' });
      }
      return res.status(200).json({ message: 'Signup successful' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user in the database by their username
  pool.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error fetching user from database:', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    // Check if the user exists in the database
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
   console.log(results[0]);
    const user = results[0];

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Something went wrong' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Password is correct, user is authenticated
      // You can now generate a token for token-based authentication (optional)
      // const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

      // Send the token as part of the response (optional)
      return res.status(200).json({ message: 'Login successful' });
    });
  });
});

});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

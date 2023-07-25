// config/db.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL user
  password: 'root', // Replace with your MySQL password
  database: 'art', // Replace with your database name
  port:'3306',
  waitForConnections: true,
  connectionLimit: 10, // Adjust the connection limit as per your needs
  queueLimit: 0,
});

module.exports = pool;

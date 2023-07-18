// server/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/artwork', (req, res) => {
  // Replace this with actual artwork data from your database or a static JSON file
  const artwork = [
    { id: 1, title: 'Artwork 1', description: 'Description 1', imageUrl: '...' },
    { id: 2, title: 'Artwork 2', description: 'Description 2', imageUrl: '...' },
    // Add more artwork items as needed
  ];

  res.json(artwork);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

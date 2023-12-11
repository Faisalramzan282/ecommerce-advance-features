const express = require('express');
const pool = require('./config');
const app = express();
const port = 3080;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
pool.query('SELECT 1 + 1 as result', (err, results) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    console.log('Result:', results[0].result);
  }
});
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const timeout = require('connect-timeout');

// Initialize DB:
// require('./initDB')();

const app = express();

// Create GET Request
app.get('/', (req, res) => {
  res.send("Express is working on Vercel");
});

app.get('/test', (req, res) => {
  res.send("Test page. Success!");
});

//Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});


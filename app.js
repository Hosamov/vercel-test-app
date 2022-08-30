const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const timeout = require('connect-timeout');

// Initialize DB:
require('./initDB')();

const app = express();

app.set('view engine', 'pug'); // Using pug template

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Mongoose schema for the siblings app
const siblingsSchema = new mongoose.Schema({
  name: String,
  voteCount: Number,
  rank: Number
});

const Sibling = mongoose.model('Sibling', siblingsSchema);

// Create GET Request
app.get('/', (req, res) => {
  // Search mongoDB collection:
  Sibling.find({
    voteCount: {
      $gte: 0
    }
  }, (err, siblings) => {
    res.render('home', {
      siblings
    }); // Render home template, passing in siblings data
  }).sort({
    voteCount: -1
  });
});

app.get('/test', (req, res) => {
  res.send("Test page. Success!");
});

//Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});


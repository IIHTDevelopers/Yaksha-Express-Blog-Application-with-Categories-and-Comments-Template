// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');

// Set up Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes from index.js

module.exports = app;

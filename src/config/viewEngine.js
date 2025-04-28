const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // Set the views directory
    app.set('views', path.join('./src', 'views'));

    // Set the view engine to EJS
    app.set('view engine', 'ejs');

    // Serve static files from the public directory
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine;
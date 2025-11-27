// Core imports
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();     // Load .env file for DB credentials

// Create the Express application object
const app = express();
const PORT = 8000;

// ----- View engine -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Middleware -----
app.use(express.urlencoded({ extended: true }));   // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// ----- App-specific data -----
app.locals.shopData = { shopName: "Bertie's Books" };

// ----- Database connection (mysql2 pool) -----
const db = mysql.createPool({
    user: process.env.BB_USER,
    password: process.env.BB_PASSWORD,
    database: process.env.BB_DATABASE,
    socketPath: '/tmp/mysql.sock',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
global.db = db;   // Make DB available in all routes

// ----- Routers -----
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);   // <-- books mounted here

// ----- Start the web app -----
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

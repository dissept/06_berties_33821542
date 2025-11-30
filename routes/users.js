// bcrypt & salt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create a new router
const express = require("express");
const router = express.Router();

// Show registration form
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Handle registration form submit
router.post('/registered', function (req, res, next) {
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const username = req.body.username;       
    const plainPassword = req.body.password;  

    // Hash the password before storing
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }

        const sql = `
            INSERT INTO users (username, first_name, last_name, email, hashedPassword)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [username, first, last, email, hashedPassword], function (err, result) {
            if (err) {
                return next(err);
            }

            // For the lab: show both plain and hashed password
            let message = '';
            message += 'Hello ' + first + ' ' + last + ', you are now registered!<br>';
            message += 'We will send an email to you at ' + email + '.<br><br>';
            message += 'Your password is: ' + plainPassword + '<br>';
            message += 'Your hashed password is: ' + hashedPassword + '<br>';

            res.send(message);
        });
    });
});

// Show list of users with no password
router.get('/list', function (req, res, next) {
    const sql = `
        SELECT username, first_name, last_name, email
        FROM users
        ORDER BY username
    `;

    db.query(sql, function (err, rows) {
        if (err) {
            return next(err);
        }
        // Render an EJS view 
        res.render('users-list.ejs', { users: rows });
    });
});

// Show login form
router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

// Handle login submit
router.post('/loggedin', function (req, res, next) {
    const username = req.body.username;
    const plainPassword = req.body.password;

    // 1. Get the stored hashed password for this user
    const sql = `
        SELECT first_name, hashedPassword
        FROM users
        WHERE username = ?
    `;

    db.query(sql, [username], function (err, rows) {
        if (err) {
            return next(err);
        }

        if (rows.length === 0) {
            // No user
            return res.send('Login failed: user not found.');
        }

        const user = rows[0];
        const hashedPassword = user.hashedPassword;

        // 2. Compare the password with the stored hash
        bcrypt.compare(plainPassword, hashedPassword, function (err, same) {
            if (err) {
                return next(err);
            }

            if (same) {
                res.send('Login successful – welcome, ' + user.first_name + '!');
            } else {
                res.send('Login failed: incorrect password.');
            }
        });
    });
});

// Export the router object so index.js can access it
module.exports = router;

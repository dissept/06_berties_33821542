const express = require("express");
const router = express.Router();
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        // send them to the real login URL
        return res.redirect('/users/login');
    }
    next();
};


// Show search form
router.get('/search', function (req, res, next) {
    res.render("search.ejs");
});

// Search result (query DB)
router.get('/search-result', function (req, res, next) {
    const keyword = req.query.keyword || '';
    const sqlquery = "SELECT * FROM books WHERE name LIKE ?";

    db.query(sqlquery, [`%${keyword}%`], (err, result) => {
        if (err) {
            console.error("DB error in /books/search-result:", err);
            return next(err);
        }
        res.render('search-result.ejs', {
            keyword: keyword,
            results: result
        });
    });
});

// List all books
router.get('/list', redirectLogin, function (req, res, next) {
    const sqlquery = "SELECT * FROM books";

    db.query(sqlquery, (err, result) => {
        if (err) {
            console.error("DB error in /books/list:", err);
            return next(err);
        }
        res.render('list.ejs', { books: result });
    });
});


// Show add form
router.get('/add', redirectLogin, function (req, res, next) {
    res.render('addbook.ejs');
});

// Handle add form submit
router.post('/add', redirectLogin, function (req, res, next) {
    const name = req.body.name;
    const price = parseFloat(req.body.price);

    const sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";

    db.query(sqlquery, [name, price], (err, result) => {
        if (err) {
            console.error("DB error in POST /books/add:", err);
            return next(err);
        }
        res.redirect('/books/list');
    });
});


// Delete a book
router.get('/delete/:id', redirectLogin, function (req, res, next) {
    const id = req.params.id;
    const sqlquery = "DELETE FROM books WHERE id = ?";

    db.query(sqlquery, [id], (err, result) => {
        if (err) {
            console.error("DB error in /books/delete/:id:", err);
            return next(err);
        }
        res.redirect('/books/list');
    });
});

// Show edit form
router.get('/edit/:id', redirectLogin, function (req, res, next) {
    const id = req.params.id;
    const sqlquery = "SELECT * FROM books WHERE id = ?";

    db.query(sqlquery, [id], (err, result) => {
        if (err) {
            console.error("DB error in GET /books/edit/:id:", err);
            return next(err);
        }
        if (result.length === 0) {
            return res.status(404).send("Book not found");
        }
        res.render('editbook.ejs', { book: result[0] });
    });
});

// Handle edit submit
router.post('/edit/:id', redirectLogin, function (req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const price = parseFloat(req.body.price);

    const sqlquery = "UPDATE books SET name = ?, price = ? WHERE id = ?";

    db.query(sqlquery, [name, price, id], (err, result) => {
        if (err) {
            console.error("DB error in POST /books/edit/:id:", err);
            return next(err);
        }
        res.render('bookadded.ejs', { name: name, price: price });
    });
});


// Bargain books (price < 20)
router.get('/bargainbooks', function (req, res, next) {
    const sqlquery = "SELECT * FROM books WHERE price < 20 ORDER BY price ASC";

    db.query(sqlquery, (err, result) => {
        if (err) {
            console.error("DB error in /books/bargainbooks:", err);
            return next(err);
        }
        res.render('bargainbooks.ejs', { books: result });
    });
});


// Export the router

module.exports = router;

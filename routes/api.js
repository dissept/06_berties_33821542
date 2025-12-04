// routes/api.js
const express = require('express');
const router = express.Router();

// GET /api/books
router.get('/books', function (req, res, next) {
  // Read query parameters
  const search = req.query.search || '';
  const minprice = req.query.minprice;
  const maxprice = req.query.max_price || req.query.maxprice; // support both
  const sort = req.query.sort || '';

  // Start building SQL + parameters
  let sqlquery = 'SELECT * FROM books';
  const whereClauses = [];
  const params = [];

  // ----- Task 3: search term -----
  if (search) {
    whereClauses.push('name LIKE ?');
    params.push('%' + search + '%');
  }

  // ----- Task 4: price range -----
  if (minprice) {
    whereClauses.push('price >= ?');
    params.push(parseFloat(minprice));
  }

  if (maxprice) {
    whereClauses.push('price <= ?');
    params.push(parseFloat(maxprice));
  }

  if (whereClauses.length > 0) {
    sqlquery += ' WHERE ' + whereClauses.join(' AND ');
  }

  // ----- Task 5: sort option -----
  // allow specific columns 
  if (sort === 'name') {
    sqlquery += ' ORDER BY name';
  } else if (sort === 'price') {
    sqlquery += ' ORDER BY price';
  } else {
    sqlquery += ' ORDER BY id'; // default order
  }

  // Execute query
  db.query(sqlquery, params, (err, result) => {
    if (err) {
      console.error('DB error in /api/books:', err);
      res.status(500).json({ error: 'Database error', details: err });
      return next(err);
    } else {
      // Task 1 & 2: return JSON
      res.json(result);
    }
  });
});


// OPTIONAL: Task 2 – use a friend’s API
const request = require('request');

router.get('/friendsbooks', function (req, res, next) {
  const FRIEND_API_URL = 'https://www.doc.gold.ac.uk/usr/224/api/books';

  request(FRIEND_API_URL, function (err, response, body) {
    if (err) {
      console.error('Error calling friend API:', err);
      return next(err);
    }

    //friendly template:
    res.render('friendsbooks.ejs', { books });
  });
});


module.exports = router;

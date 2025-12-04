const express = require("express");
const request = require('request');
const router = express.Router();

// Database setup
const apiKey = process.env.OWM_API_KEY || '602d98af7df412ed72e391d8b30d3eb2';

// Task 2 + 3: weather now route
router.get('/now', (req, res, next) => {
  const city = 'London';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      return next(err);
    }

    let weather;
    try {
      weather = JSON.parse(body);
    } catch (parseError) {
      return next(parseError);
    }

    // Task 6: error handling
    if (!weather || weather.cod !== 200 || !weather.main) {
      return res.send('No data found');
    }

    const wmsg =
      'It is ' + weather.main.temp +
      ' degrees in ' + weather.name +
      '! <br> The humidity now is: ' +
      weather.main.humidity + '%.';

    res.send(wmsg);
  });
});

// Task 4–6: /weather form
router.get('/', (req, res, next) => {
  const city = req.query.city || '';

  // First visit: just show the form
  if (!city) {
    return res.render('weather.ejs', {
      title: 'Weather',
      weather: null,
      error: null,
    });
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      return next(err);
    }

    let weather;
    try {
      weather = JSON.parse(body);
    } catch (parseError) {
      return next(parseError);
    }

    // Task 6: error handling for bad city / missing data
    if (!weather || weather.cod !== 200 || !weather.main) {
      return res.render('weather.ejs', {
        title: 'Weather',
        weather: null,
        error: weather && weather.message
          ? `Error: ${weather.message}`
          : 'No data found for that city.',
      });
    }

    // Task 5: extra info – feels like, wind, etc.
    const weatherData = {
      city: weather.name,
      temp: weather.main.temp,
      feelsLike: weather.main.feels_like,
      humidity: weather.main.humidity,
      description:
        weather.weather && weather.weather[0]
          ? weather.weather[0].description
          : '',
      windSpeed: weather.wind ? weather.wind.speed : null,
      windDeg: weather.wind ? weather.wind.deg : null,
    };

    res.render('weather.ejs', {
      title: 'Weather',
      weather: weatherData,
      error: null,
    });
  });
});

module.exports = router;
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
router.get('/list', function (req, res, next) {
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
router.get('/add', function (req, res, next) {
    res.render('addbook.ejs');
});

// Handle add form submit
router.post('/add', function (req, res, next) {
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
router.get('/delete/:id', function (req, res, next) {
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
router.get('/edit/:id', function (req, res, next) {
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
router.post('/edit/:id', function (req, res, next) {
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

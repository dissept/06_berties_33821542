// routes/weather.js
const express = require('express');
const request = require('request');

const router = express.Router();

const apiKey = process.env.OWM_API_KEY; // from .env

// ---------- /weather/now ----------
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

    // Error handling (Task 6)
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

// ---------- /weather ----------
router.get('/', (req, res, next) => {
  const city = req.query.city || '';

  // First visit: only show form
  if (!city) {
    return res.render('weather.ejs', {
      title: "Weather forecast",
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

    // Handle invalid city / bad response (Task 6)
    if (!weather || weather.cod !== 200 || !weather.main) {
      return res.render('weather.ejs', {
        title: "Weather forecast",
        weather: null,
        error: weather && weather.message
          ? `Error: ${weather.message}`
          : 'No data found for that city.',
      });
    }

    // Extra info (Task 5)
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
      title: "Weather forecast",
      weather: weatherData,
      error: null,
    });
  });
});

module.exports = router;

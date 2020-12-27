require('dotenv').config();
var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = process.env.APIKEY;
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});



/* GET home page. */
router.get('/', function(req, res, next) {

  request.get(nowPlayingUrl, (error, response, movieData) => {

    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render('index', {
      parsedData: parsedData.results
    });
  })
});

// /movie/:id is a wildcard route
router.get('/movie/:id', (req, res, next) => {

  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render('single-movie', {
      parsedData: parsedData
    });
  })
})

router.post('/search', (req, res, next) => {
  const userSearchTerm = req.body.movieSearch;
  const cat = req.body.cat;
  // req.params.
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request.get( movieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData)
    if(cat == "person"){
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results
    })
  })
})

module.exports = router;

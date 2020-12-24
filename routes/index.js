require('dotenv').config();
var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = process.env.APIKEY;
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;

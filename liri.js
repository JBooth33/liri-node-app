require("dotenv").config();

//setting up modules
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require('fs');

//store argument 
var nodeArgv = process.argv;
var command = process.argv[2];


//switch case for command user gives



//function for displaying song
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});



//function for displaying tweets

var params = {screen_name: 'javy23baez'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


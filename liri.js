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
switch(command) {
  case "spotify-this-song":
    getSongInfo();
    break;
  case "my-tweets":
    getTweets();
    break;
  case "movie-this":
    getMovieInfo();
    break;
  case "do-what-it-says":
    doSomething();
    break;
  default:
    console.log("Type one of the following commands after 'node liri.js' : spotify-this-song + song name, my-tweets, movie-this + movie name, do-whatever-it-says")
}


//function for displaying song
/*var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
*/


//function for displaying tweets
/*
var params = {screen_name: 'javy23baez'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
*/

//function for displaying movie info
function getMovieInfo (movie) {
  var omdbURL = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + movie + "&plot=short&tomatoes=true";
  console.log (omdbURL);
}

getMovieInfo('It');
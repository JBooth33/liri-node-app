require("dotenv").config();

//setting up modules
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require('fs');

//store argument 
var nodeArgv = process.argv;
var command = process.argv[2];
var userChoice = process.argv[3];


//switch case for command user gives
switch(command) {
  case "spotify-this-song":
    if(userChoice){
      getSongInfo(userChoice);
    } else {
      thatWay();
    }
    break;
  case "my-tweets":
    getTweets();
    break;
  case "movie-this":
    if(userChoice) {
      getMovieInfo(userChoice);
    } else {
      mrNobody();
    }
    break;
  case "do-what-it-says":
    doSomething();
    break;
  default:
    console.log("Type one of the following commands after 'node liri.js' : spotify-this-song + song name, my-tweets, movie-this + movie name, do-whatever-it-says")
}


//function for displaying song
function getSongInfo() {
  var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: userChoice, limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  var results = data.tracks.items[0];
  console.log("Artist: " + results.artists[0].name);
  console.log("Song: " + results.name);
  console.log("Song URL: " + results.external_urls.spotify);
  console.log("Album: " + results.album.name);
});

  
}

//function for displaying tweets

function getTweets() {
  var params = {screen_name: 'JBooth_33'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < 20; i++) {
        var date = tweets[i].created_at;
        console.log("@JBooth_33: " + tweets[i].text + " Tweeted On: " + date.substring(0, 19));
      }
    }
  });
}

//function for displaying movie info
function getMovieInfo () {
  var movie = process.argv[3];
  var omdbURL = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + movie + "&plot=short&tomatoes=true";
  console.log (omdbURL);
  request(omdbURL, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country Where Movie Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    } 
  });
}

//function that takes command from random.txt
function doSomething() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    var text = data.split(',');
    var song = text[1];
    thatWay(song);
  });
}

//function for if user does not enter song
function thatWay() {
  var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: "I-want-it-that-way", limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  var results = data.tracks.items[0];

  console.log("Artist: " + results.artists[0].name);
  console.log("Song: " + results.name);
  console.log("Song URL: " + results.external_urls.spotify);
  console.log("Album: " + results.album.name);
});
}

//function for if user does not enter movie
function mrNobody() {
  var movie = "mr.-nobody";
  var omdbURL = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + movie + "&plot=short&tomatoes=true";
  console.log (omdbURL);
  request(omdbURL, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country Where Movie Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    } 
  });
}




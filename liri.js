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

function getTweets() {
  var params = {screen_name: 'javy23baez'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < 20; i++) {
        var date = tweets[i].created_at;
        console.log("@javy23baez: " + tweets[i].text + " Tweeted On: " + date.substring(0, 19));
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
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country Where Movie Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

getMovieInfo('It');
getTweets();
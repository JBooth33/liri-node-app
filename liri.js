require("dotenv").config();

//setting up modules
var keys = require('./keys.js');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var client = new twitter(keys.twitter);
var fs = require('fs');

//store argument 
var nodeArgv = process.argv;
var command = process.argv[2];


//switch case for command user gives



//function for displaying song


//function for displaying movie


//function for displaying tweets



var axios = require('axios');

var fs = require("fs")

require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

var userInput = process.argv.slice(3).join(" ");

function concertThis() {
  var artist = userInput
  var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(URL).then(
    function (response) {
      console.log(response.data)
      var jsonData = response.data[0];
      var showData = [
        "Name: " + jsonData.venue.name,
        "Venue Location: " + jsonData.venue.city,
        "Date: " + jsonData.datetime,
      ].join("\n\n");
      console.log(showData)
      fs.appendFile("log.txt", showData, function(err) {
        if (err) throw err;
        console.log(showData);
      })
    })
}
function spotifyThis() {
  var songname = userInput
  spotify.search({ type: 'track', query: songname }, function (err, response) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var showData = [
      "Artist Name: " + response.tracks.items[0].artists[0].name,
      "Song Name: " + response.tracks.items[0].name,
      "Link: " + response.tracks.items[0].preview_url,
      "Album: " + response.tracks.items[0].album.name,
    ].join("\n\n");
    console.log(showData)
    fs.appendFile("log.txt", showData, function(err) {
      if (err) throw err;
      console.log(showData);
    })
  })
}
function movieThis(){
  var moviename = userInput
  var URL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";
  axios.get(URL).then(function(response){
    var jsonData = response.data
    var showData = [
      "Title: " + jsonData.Title,
      "Year: " + jsonData.Released,
      "IMDB Rating: " + jsonData.imdbRating,
      "Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value,
      "Country Movie Produced: " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Plot: " + jsonData.Plot,
      "Actors: " + jsonData.Actors,
    ].join("\n\n");
    console.log(showData)
    fs.appendFile("log.txt", showData, function(err) {
      if (err) throw err;
      console.log(showData);
    })
  })
}

if (search === "spotify-this-song") {
  spotifyThis();
}
if (search === "concert-this") {
  concertThis();
}

if (search === "movie-this"){
  movieThis();
}
if ((search === "movie-this") && (!userInput)){
  userInput = "Mr. Nobody"
  movieThis();
}




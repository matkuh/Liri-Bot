require("dotenv").config();

var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);

var concertqueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

var search = processargv[2];

var userInput = process.argv[3];

var axios = require("axios");

if (search === "concert-this"){
    axios.get(concertqueryURL).then(
  function(response) {
    console.log(response);
  })

}
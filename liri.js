const API_Keys = require('./keys.js');
const twitter  = require('twitter');
const spotify  = require('node-spotify-api');
const request  = require('request');
const inquirer = require('inquirer');
const colors   = require('colors');


inquirer.prompt([{
    type: 'list',
    name: 'program',
    message: 'What program do you want to run?',
    choices: [
		'my-tweets', 
		'spotify-this-song', 
		'movie-this', 
		'do-what-it-says\n'
    ]
  }
])
.then((answers) => {

	switch (answers.program) {

		case 'my-tweets':
			getTweets();
			break;

		case 'spotify-this-song':
			inquirer.prompt([{
			    type: 'input',
			    name: 'song',
			    message: 'What song do you want to get info for?',
			  }
			])
			.then((answers) => {
				const song = answers.song;
				getMusic(song);
			});
			break;

		case 'movie-this':
			console.log('movie-this');
			// getMovie();
			break;

		case 'do-what-it-says\n':
			console.log('do-what-it-says');
			break;

		default:
			console.log("You've done something wrong, try again...")
	}
})



function getTweets() {
	const client = new twitter(API_Keys.twitterKeys);
	const queryUrl = "https://api.twitter.com/1.1/search/tweets.json?q=realFredLintz&result_type=recent&count=20";

	client.get(queryUrl, function(error, tweets, response) {
		console.log("\nHere are the latest tweets from @realFredLintz: \n".cyan);
   		
   		for (var i = 0; i < tweets.statuses.length; i++) {
   			console.log(tweets.statuses[i].created_at.substring(0,19).green + " - " + tweets.statuses[i].text.cyan)
   		}
   		console.log('');	
	});
}



function getMusic(song) {
	const Spotify = new spotify(API_Keys.spotifyKeys);
 
	Spotify.search({ type: 'track', query: song, limit: 1 }, (err, data) => {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		// console.log(JSON.stringify(data.tracks.items[0], null, 2));
		let artistName = data.tracks.items[0].album.artists[0].name;
		let songName = data.tracks.items[0].name;
		let songURL = data.tracks.items[0].album.artists[0].external_urls.spotify;
		let albumName = data.tracks.items[0].album.name;
		console.log("\nGreat choice!\n".cyan);
		console.log(`I love '${songName}' by ${artistName}. Wasn't that on the album '${albumName}'?`.cyan);
		console.log(`Have a listen over at ${songURL.green}!\n`.cyan);
		});
}



function getMovie() {

}





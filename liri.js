let API_Keys = require('./keys.js');
let spotify = require('spotify');
let request = require('request');
let inquirer = require('inquirer');


inquirer.prompt([{
    type: 'list',
    name: 'program',
    message: '\nWhat program do you want to run?',
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
			console.log('my-tweets');
			break;

		case 'spotify-this-song':
			inquirer.prompt([{
			    type: 'input',
			    name: 'song',
			    message: '\nWhat song do you want to get info for?',
			  }
			])
			.then((answers) => {
				console.log(answers);
			});
			break;

		case 'movie-this':
			console.log('movie-this');
			break;

		case 'do-what-it-says\n':
			console.log('do-what-it-says');
			break;

		default:
			console.log("You've done something wrong, try again...")
	}
})



function getTweets() {

}

function getMusic() {

}

function getMovie() {

}





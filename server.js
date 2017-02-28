// Require dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
// Use bluebird promises
mongoose.Promise = Promise;

// Require Article and Comment models
var Article = require('./models/Article.js');
var Comment = require('./models/Comment.js');

// Initialize express
var app = express();
var PORT = process.env.PORT || 8080;

// Use morgan to log status of requests that are made
app.use(logger('dev'));
// Use body parser
app.use(bodyParser.urlencoded({
	extended: false
}));

// Public static directory
app.use(express.static(__dirname + '/public'));

// Configure database with mongoose
mongoose.connect('mongodb://localhost/news-scraper');
var db = mongoose.connection;

// Log mongoose errors
db.on('error', function(error) {
	console.log('Mongoose error: ' + error);
});

// Log success message once connection to db through mongoose is established
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

// ----------
// | Routes |
// ----------

// Index route
app.get('/', function(req, res) {
	res.send(index.html);
});

// GET request to scrape articles from sciencenews.org
app.get('/scrape', function(req, res) {
	request('https://www.sciencenews.org/', function(error, response, html) {
		// load response html into cheerio and save as $ selector
		var $ = cheerio.load(html);
		// Grab every h2 element with class 'node-title'
		$('h2.node-title').each(function(i, element) {
			// result is an object that will hold an individual article's info
			var result = {};
			// Grab desired info about each article
			result.title = $(this).children('a').attr('title');
			result.link = 'https://www.sciencenews.org' + $(this).children('a').attr('href');
			result.content = $(this).parent().siblings('.content').text();
			// Create a new entry using Article model
			var entry = new Article(result);

			// Save entry to db
			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		});
	});
	res.send('Scrape Complete');
});

// GET request to grap all articles from mongoDB
app.get('/articles', function(req, res) {
	Article.find({}, function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			// Send the doc to browser as a json
			res.json(doc);
		}
	});
});

app.listen(PORT, function() {
	console.log('Listening on port: ' + PORT);
});
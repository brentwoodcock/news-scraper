var mongoose = require('mongoose');
// Create schema class
var Schema = mongoose.Schema;

// Create article schema structure
var ArticleSchema = new Schema({
	// article's title (required)
	title: {
		type: String,
		required: true,
		trim: true
	},
	// preview content of article
	content: {
		type: String,
		trim: true
	},
	// article's URL (required)
	link: {
		type: String,
		required: true
	},
	// comments is an array of ObjectIds linked to the Comment model by ref
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

// Create the Article model using ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article

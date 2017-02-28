var mongoose = require('mongoose');
// Create schema class
var Schema = mongoose.Schema;

// Create comment schema structure
var CommentSchema = new Schema({
	// body is a string that will hold the content of a comment
	body: {
		type: String,
		required: true
	},
	// created is the time at which the comment was made
	created: {
		type: Date,
		default: Date.now
	}
});

// Create the Comment model using CommentSchema
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

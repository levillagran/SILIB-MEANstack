'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = Schema({
	name: String,
	mail: String,
	facebook: String,
	twitter: String,
	bit_bio: String,
	full_bio: String,
	posts: String,
	awards: String,
	file: { type: Schema.ObjectId, ref: 'File'}
});

module.exports = mongoose.model('Author', AuthorSchema);
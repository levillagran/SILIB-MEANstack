'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = Schema({
	file_name: String,
	file_type: String,
	file: String,
	file_size: String,
	categorie: { type: Schema.ObjectId, ref: 'Categorie'}
});

module.exports = mongoose.model('File', FileSchema);
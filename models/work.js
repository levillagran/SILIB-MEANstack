'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = Schema({
	work_title: String,
	work_type: String,
	publication_date: Date,
	price_digital: Number,
	price_audio: Number,
	price_printed: Number,
	description: String,
	gender: { type: Schema.ObjectId, ref: 'Gender'},
	file: { type: Schema.ObjectId, ref: 'File'},
	author: { type: Schema.ObjectId, ref: 'Author'}
});

module.exports = mongoose.model('Work', WorkSchema);
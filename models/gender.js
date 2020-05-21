'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenderSchema = Schema({
	gender_name: String
});

module.exports = mongoose.model('Gender' GenderSchema);
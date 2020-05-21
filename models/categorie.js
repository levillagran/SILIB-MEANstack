'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorieSchema = Schema({
	categorie_name: String
});

module.exports = mongoose.model('Categorie', CategorieSchema);
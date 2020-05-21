'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 2505;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/lib_db', (err, res) =>{
	if(err){
		throw err;
	}else{
		console.log("conection database success...");
		
		app.listen(port, function(){
			console.log("Api rest listening on http://localhost:"+port);
		});
	}
});
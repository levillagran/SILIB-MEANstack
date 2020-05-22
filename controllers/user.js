'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function saveUser(req, res) {
	var user = new User();

	var params = req.body;

	console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.password =params.password;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';

	if (params.password) {
		//encripta contrasena
		bcrypt.hash(params.password, null, null, function(err, hash) {
			user.password = hash;
			if (user.name != null && user.surname != null && user.email != null) {
				//save user
				user.save((err, userStored) => {
					if (err) {
						res.status(500).send({message: 'error save'});
					} else {
						if (!userStored) {
							res.status(404).send({message: 'no se a registrado el usuario'});
						} else {
							res.status(200).send({user: userStored});
						}
					}
				});
			} else {
				res.status(200).send({message: 'all labels'});
			}
		});
	} else {
		res.status(200).send({message: 'not password'});
	}

}

function loginUser(req, res) {
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err, user) => {
		if (err) {
			res.status(500).send({message: 'error reques'});
		} else {
			if (!user) {
				res.status(400).send({message: 'user dont exist'});
			} else {
				bcrypt.compare(password, user.password, function (err, check) {
					if (check) {
						//devuelve los datos del usuario logiado
						if (params.gethash) {
							//devuelve un token de jws
							res.status(200).send({
								token: jwt.createToken(user)
							});
						} else {
							res.status(200).send({user});
						}
					} else {
						res.status(400).send({message: 'user dont login'});
					}
				});
			}
		}
	});

}

function updateUser(req,res) {
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
		if (err) {
			res.status(500).send({message: 'Error user update'});
		} else {
			if (!userUpdated) {
				res.status(404).send({message: 'No user update, not found'});
			} else {
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadImage(req, res) {
	var userId = req.params.id;
	var file_name = 'No upload image..';

	if (req.files) {
		var file_path = req.files.image.path;
		console.log(req.files.image.path);
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			User.findByIdAndUpdate(userId, {image: file_name}, (err,userUpdated)=>{
				if (!userUpdated) {
					res.status(404).send({message: 'No user update, not found'});
				} else {
					res.status(200).send({user: userUpdated});
				}
			});
		} else {}

	} else {
		res.status(200).send({message: 'not upload image......'});
	}
}

module.exports = {
	saveUser,
	loginUser,
	updateUser,
	uploadImage
};
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
	//user.file = 'null';

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

module.exports = {
	saveUser,
	loginUser
};
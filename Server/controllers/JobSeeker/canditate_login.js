const express = require('express');
const app = express();
const db = require('../../db');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(
	session({
		key: 'cookieId',
		secret: 'noSecret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 30,
		},
	})
);

// form validation done in userValidate.js.
// User Routes in candidateRoutes.js.
//  Middlewares in MiddleWare folder.

const candidate_login = (req, res) => {
	const { userName, password } = req.body;
	const userLogin = `SELECT * FROM UserRegistration WHERE userName = ?;`;

	db.query(userLogin, userName, (err, result) => {
		try {
			if (err) {
				throw err;
			}
			// check if user exists in the database.
			if (result.length > 0) {
				// compare hashed password with provided password
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (error) {
						console.log(error);
					}
					if (response) {
						console.log(req.session); //  <----------- returns 'undefine'
						// *sending user Id and userName to the front end.
						res.send({
							isAthenticated: true,
							userName: result[0].userName,
							id: result[0].id,
						});
					} else {
						// wrong userName/password combination
						res.send({
							message: 'Wrong username/password combination!',
						});
					}
				});
			} else {
				// wrong userName
				res.send({ code: 500, message: "User doesn't exists!" });
			}
		} catch (error) {
			res.send(error.message);
			console.log(error);
		}
	});
};

module.exports = candidate_login;

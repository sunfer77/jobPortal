const db = require('../../db');
const bcrypt = require('bcrypt');

const job_Seeker_login = (req, res) => {
	const { userName, password } = req.body;
	const userLogin = `SELECT * FROM UserRegistration WHERE userName = ?;`;

	db.query(userLogin, userName, (err, result) => {
		try {
			if (err) {
				throw err;
			}
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (error) {
						console.log(error);
					}
					if (response) {
						res.send({
							isAuthenticated: true,
							userName: result[0].userName,
							id: result[0].id,
						});
					} else {
						res.send({
							isAuthenticated: false,
							message: 'Wrong username/password combination!',
						});
					}
				});
			} else {
				res.send({ isAuthenticated: false, message: "User doesn't exists!" });
			}
		} catch (error) {
			res.send(error.message);
			console.log(error);
		}
	});
};

module.exports = job_Seeker_login;

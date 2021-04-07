//const mysql = require('mysql');
const db = require('../../db');
const bcrypt = require('bcrypt');
const saltRound = 10;

const job_Seeker_signUp = async (req, res) => {
	const { userName, email, password } = req.body;
	console.log(req.body);

	const userSignUp = `INSERT INTO UserRegistration (
		userName, 
		email , 
		password) VALUES (?,?,?);`;

	// bycrypt start here
	await bcrypt.hash(password, saltRound, (err, hash) => {
		if (err) {
			throw new Error('Something went wrong!');
		}

		db.query(userSignUp, [userName, email, hash], (err, result) => {
			try {
				if (err) {
					throw err;
				} else {
					result.serverStatus == 2 && res.send('Registration suscessful!');
				}
			} catch (error) {
				console.log(error);
				error.sqlMessage.includes('userName')
					? res.send('username already taken')
					: res.send('e-mail already exists');
			}
		});
	});
};

module.exports = job_Seeker_signUp;

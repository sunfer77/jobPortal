//const mysql = require('mysql');
const db = require('../../db');
const bcrypt = require('bcrypt');
const saltRound = 10;

const job_Seeker_signUp = async (req, res) => {
	const { userName, email, password } = req.body;

	const userSignUp = `INSERT INTO UserRegistration 
						(userName, email, password)  
						VALUES (?,?,?);`;

	await bcrypt.hash(password, saltRound, (err, hash) => {
		if (err) {
			throw new Error('Something went wrong!');
		}

		db.query(userSignUp, [userName, email, hash], (err, result) => {
			try {
				if (err) {
					throw err;
				} else {
					res.send({ message: 'Registration suscessful!', isRegistered: true });
				}
			} catch (error) {
				console.log(error.message);
				error.sqlMessage.includes('userName')
					? res.send({ message: 'username already taken' })
					: res.send({ message: 'e-mail already exists' });
			}
		});
	});
};

module.exports = job_Seeker_signUp;

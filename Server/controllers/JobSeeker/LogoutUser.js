const db = require('../../db');

const UserData = (req, res) => {
	const id = 85;
	const userData = `SELECT * FROM JobSeekerProfile WHERE id = ?;`;
	try {
		db.query(userData, id, (err, result) => {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					res.send({ ...result[0], CvCreated: true });
				} else {
					res.send('noUser');
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = UserData;

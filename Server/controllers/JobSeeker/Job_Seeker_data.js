const db = require('../../db');

const getUserData = (req, res) => {
	const { id } = req.params;
	const userData = `SELECT * FROM JobSeekerProfile WHERE id = ?;`;
	try {
		db.query(userData, id, (err, result) => {
			if (err) {
				throw err;
			} else {
				res.send(result);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = getUserData;

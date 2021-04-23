const db = require('../../db');

const getUserData = (req, res) => {
	const { id } = req.params;
	const userData = `SELECT * FROM JobSeekerProfile WHERE id = ?;`;
	try {
		db.query(userData, id, (err, result) => {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					// added CvCreated object instance to use in NaveBar component to chech wether the current user has created cv
					res.send({ ...result[0], CvCreated: true });
				} else {
					res.send({ CvCreated: false });
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = getUserData;

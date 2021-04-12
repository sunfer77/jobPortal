const db = require('../../db');

const CV_Update = (req, res) => {
	const { firstName, lastName, city, region, aboutMe, id } = req.body;
	console.log(req.body);
	const updatedData = `UPDATE JobSeekerProfile 
                         SET  firstName = ?, lastName = ?, city = ?, region = ?, aboutMe = ? 
                         WHERE id = ?;`;

	db.query(
		updatedData,
		[firstName, lastName, city, region, aboutMe, id],
		(err, result) => {
			try {
				if (err) {
					throw err;
				} else {
					res.send({ message: `Your Profile Updated!` });
					console.log(result);
				}
			} catch (error) {
				res.send(error.messge);
				console.log(error);
			}
		}
	);
};
module.exports = CV_Update;

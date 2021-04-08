const db = require('../../db');

const Create_CV = (req, res) => {
	const { userName, firstName, lastName, city, region, aboutMe } = req.body;
	console.log(req.body);

	const CVData = `INSERT INTO JobSeekerProfile
                    (userName,firstName,lastName,city,region,aboutMe) 
                    VALUES (?,?,?,?,?,?);`;

	db.query(
		CVData,
		[userName, firstName, lastName, city, region, aboutMe],
		(err, result) => {
			try {
				if (err) {
					throw err;
				} else {
					res.send({ message: 'Profile Created' });
				}
			} catch (error) {
				res.send(error.messge);
				console.log(error);
			}
		}
	);
};
module.exports = Create_CV;

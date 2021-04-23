const db = require('../../db');

const Create_CV = (req, res) => {
	const { id, firstName, lastName, city, region, aboutMe } = req.body;

	const CVData = `INSERT INTO JobSeekerProfile
                    (id,firstName,lastName,city,region,aboutMe) 
                    VALUES (?,?,?,?,?,?);`;

	db.query(
		CVData,
		[id, firstName, lastName, city, region, aboutMe],
		(err, result) => {
			try {
				if (err) {
					throw err;
				} else {
					req.session.cv = result;
					res.send({
						message: 'Congratulation! Your CV is Created!',
					});
				}
			} catch (error) {
				if (error.errno == 1062) {
					res.send('You already have created your CV');
				}
			}
		}
	);
};
module.exports = Create_CV;

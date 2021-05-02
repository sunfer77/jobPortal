// sendin user data after successfully logged in

const job_seeker_session = (req, res) => {
	try {
		if (req.session.user) {
			res.send({
				isAuthenticated: true,
				id: req.session.user[0].id,
				userName: req.session.user[0].userName,
				password: req.session.user[0].password,
			});
		} else {
			res.send({
				isAuthenticated: false,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = job_seeker_session;

// sendin user data after successfully logged in

const job_seeker_session = (req, res) => {
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
};

module.exports = job_seeker_session;

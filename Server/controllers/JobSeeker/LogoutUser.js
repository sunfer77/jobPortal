const logOut = (req, res) => {
	req.session.destroy();
	res.send('loged out');
};

module.exports = logOut;

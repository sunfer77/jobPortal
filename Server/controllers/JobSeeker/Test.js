const logOut = (req, res) => {
	req.session.destroy();
	res.send('Helllooo cazzooooo');
};

module.exports = logOut;

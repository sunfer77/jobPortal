const logOut = (req, res) => {
  req.session.destroy();
  res.send("logged out");
};

module.exports = logOut;

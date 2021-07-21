const isAuthenticated = (req, res, next) => {
  req.session.user ? next() : res.status(401).send("Unauthorized access!");
};
module.exports = isAuthenticated;

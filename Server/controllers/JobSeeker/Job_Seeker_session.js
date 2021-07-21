// sending user data from database if the  user has cookie saved in the frontend.
const job_seeker_session = (req, res) => {
  try {
    if (req.session.user) {
      res.send({
        isAuthenticated: true,
        id: req.session.user[0].id,
        userName: req.session.user[0].userName,
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

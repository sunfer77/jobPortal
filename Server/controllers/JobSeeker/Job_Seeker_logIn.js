const db = require("../../db");
const bcrypt = require("bcrypt");

const job_Seeker_login = (req, res) => {
  const { userName, password } = req.body;
  const userLogin = `SELECT * FROM UserRegistration WHERE userName = ?;`;

  db.query(userLogin, userName, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        // -------------------------
        //compairing hashed password
        // -------------------------
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) {
            console.log(error);
          }
          if (response) {
            // -------------------------------------------
            // assign user data to req.session.user object
            // ------------------------------------------
            req.session.user = result;
            res.send({
              isAuthenticated: true,
              userName: req.session.user[0].userName,
              id: req.session.user[0].id,
            });
          } else {
            // -------------------------------------------
            // wrong username / password
            // ------------------------------------------
            res.send({
              isAuthenticated: false,
              message: "Wrong username/password combination!",
            });
          }
        });
      } else {
        // -------------------------------------------
        // wrong username
        // ------------------------------------------
        res.send({
          isAuthenticated: false,
          message: "Wrong username/password combination!",
        });
      }
    } catch (error) {
      res.send(error.message);
      console.log(error);
    }
  });
};

module.exports = job_Seeker_login;

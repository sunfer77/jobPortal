const db = require("../../db");

const googleAuth = async (req, res) => {
  const { userName, googleID, email } = req.body;

  const getUser = `SELECT * FROM UserRegistration
                   WHERE userName = ? AND googleID = ?;`;

  const createUser = `INSERT INTO UserRegistration
                      (userName,email,googleID)
                      VALUES (?,?,?);`;

  await db.query(getUser, [userName, googleID], (err, result) => {
    try {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        req.session.user = result;
        res.send({
          isAuthenticated: true,
          userName: req.session.user[0].userName,
          id: req.session.user[0].id,
        });
      } else {
        db.query(createUser, [userName, email, googleID], (err, user) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ id: user.insertId, isAuthenticated: true });
          }
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  });
};

module.exports = googleAuth;

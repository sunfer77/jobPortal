const db = require("../../db");

const deleteUser = (req, res) => {
  const { id } = req.params;

  const deleteCandidate = `DELETE FROM UserRegistration WHERE id = ?;`;

  try {
    db.query(deleteCandidate, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Your Account successfully deleted! :(");
        console.log(result);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = deleteUser;

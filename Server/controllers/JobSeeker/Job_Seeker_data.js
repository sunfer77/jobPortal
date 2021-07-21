const db = require("../../db");

const getUserData = (req, res) => {
  const { id } = req.params;
  const userData = `SELECT * FROM JobSeekerProfile WHERE id = ?;`;

  // --------------------------------------------------------------------------------------
  // --------Send Candidate data to use in "FinalizedUserCV.js" in the front end-----------
  // --------------------------------------------------------------------------------------
  try {
    db.query(userData, id, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          res.send({ ...result[0], CvCreated: true });
        } else {
          res.send({ CvCreated: false });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUserData;

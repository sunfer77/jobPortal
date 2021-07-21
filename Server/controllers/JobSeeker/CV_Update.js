const db = require("../../db");

const CV_Update = (req, res) => {
  const { firstName, lastName, city, region, aboutMe, id } = req.body;

  const updatedData = `UPDATE JobSeekerProfile
                         SET  firstName = ?, lastName = ?, city = ?, region = ?, aboutMe = ?
                         WHERE id = ?;`;

  db.query(
    updatedData,
    [firstName, lastName, city, region, aboutMe, id],
    (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          res.send("Your Profile is Updated!");
        }
      } catch (error) {
        res.send(error.messge);
      }
    }
  );
};
module.exports = CV_Update;

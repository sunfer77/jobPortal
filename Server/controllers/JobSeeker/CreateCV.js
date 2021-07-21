const db = require("../../db");

const Create_CV = (req, res) => {
  const { id, firstName, lastName, city, region, aboutMe } = req.body;

  const CVData = `INSERT INTO JobSeekerProfile
                    (id,firstName,lastName,city,region,aboutMe)
                    VALUES (?,?,?,?,?,?);`;

  // ------------------------------------------------------------
  // -------------------- Save CV data in database --------------
  // ------------------------------------------------------------

  db.query(
    CVData,
    [id, firstName, lastName, city, region, aboutMe],
    (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          result.legnth > 0 &&
            res.send({
              message: "Congratulation! Your CV is Created!",
              cvCreated: true,
            });
        }
      } catch (error) {
        // if (error.errno == 1062) {
        //   res.send({
        //     message: "You already have created your CV",
        //     cvCreated: false,
        //   });
        // }
        console.log(error);
      }
    }
  );
};
module.exports = Create_CV;

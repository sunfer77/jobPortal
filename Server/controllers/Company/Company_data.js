const db = require("../../db");

// --------------------------------------------------------------
// -------------------- gettin' company data by Id --------------
// --------------------------------------------------------------
const getCompanydata = (req, res) => {
  const { id } = req.params;

  const companyData = `SELECT *
	FROM company
	WHERE companyId  = '${id}';`;

  db.query(companyData, (err, result) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    } catch (error) {
      res.send(error.message);
    }
  });
};

module.exports = getCompanydata;

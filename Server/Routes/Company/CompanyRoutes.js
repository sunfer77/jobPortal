const express = require("express");
const router = express.Router();
const getCompanydata = require("../../controllers/Company/Company_data");

// -------------------- gettin' company data by Id ----------------------
// ----------------------"CompanyProfilePage.js"-------------------------
router.get("/:id", getCompanydata);

module.exports = router;

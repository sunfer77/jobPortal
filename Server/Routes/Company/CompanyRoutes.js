const express = require('express');
const router = express.Router();
const getCompanydata = require('../../controllers/Company/Company_data');

router.get('/:id', getCompanydata);

module.exports = router;

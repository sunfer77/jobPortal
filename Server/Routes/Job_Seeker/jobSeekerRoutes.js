const express = require('express');
const router = express.Router();

const form_Validation = require('../../middleWare/FormValidation');
const job_Seeker_login = require('../../controllers/JobSeeker/Job_Seeker_logIn');
const job_Seeker_signUp = require('../../controllers/JobSeeker/Job_Seeker_signup');

router.post('/sign_up', form_Validation(), job_Seeker_signUp);
router.post('/login', job_Seeker_login);

module.exports = router;

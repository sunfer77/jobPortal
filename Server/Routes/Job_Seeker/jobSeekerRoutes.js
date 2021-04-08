const express = require('express');
const router = express.Router();

const job_Seeker_login = require('../../controllers/JobSeeker/Job_Seeker_logIn');
const job_Seeker_signUp = require('../../controllers/JobSeeker/Job_Seeker_signup');
const Create_CV = require('../../controllers/JobSeeker/CreateCV');

// Validation Middle-wares
const form_Validation = require('../../middleWare/FormValidation');
const CV_Validation = require('../../middleWare/CreateCV_Validation');

router.post('/sign_up', form_Validation(), job_Seeker_signUp);
router.post('/login', job_Seeker_login);
router.post('/createCV', CV_Validation(), Create_CV);
//createCV
module.exports = router;

const express = require('express');
const router = express.Router();

const login = require('../../controllers/JobSeeker/Job_Seeker_logIn');
//const job_seeker_session = require('../../controllers/JobSeeker/Job_Seeker.Session');
const job_Seeker_signUp = require('../../controllers/JobSeeker/Job_Seeker_signup');
const Create_CV = require('../../controllers/JobSeeker/CreateCV');
const CV_Update = require('../../controllers/JobSeeker/CV_Update');
const getUserData = require('../../controllers/JobSeeker/Job_Seeker_data');

// Validation Middle-wares
const form_Validation = require('../../middleWare/FormValidation');
const CV_Validation = require('../../middleWare/CreateCV_Validation');

router.post('/login', login.job_Seeker_login);
router.get('/login', login.job_seeker_session);
router.post('/sign_up', form_Validation(), job_Seeker_signUp);
router.post('/createCV', CV_Validation(), Create_CV);
router.get('/:id', getUserData);
router.put('/updateCV', CV_Validation(), CV_Update);

module.exports = router;

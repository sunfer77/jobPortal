const express = require("express");
const router = express.Router();

const job_Seeker_login = require("../../controllers/JobSeeker/Job_Seeker_logIn");
const job_seeker_session = require("../../controllers/JobSeeker/Job_Seeker_session");
const job_Seeker_signUp = require("../../controllers/JobSeeker/Job_Seeker_signup");
const Create_CV = require("../../controllers/JobSeeker/CreateCV");
const CV_Update = require("../../controllers/JobSeeker/CV_Update");
const getUserData = require("../../controllers/JobSeeker/Job_Seeker_data");
const logOut = require("../../controllers/JobSeeker/LogoutUser");
const googleAuth = require("../../controllers/JobSeeker/LoginWithGoogle");
const deleteUser = require("../../controllers/JobSeeker/DeleteUser");

// Validation midlewares
const form_Validation = require("../../middleWare/FormValidation");
const CV_Validation = require("../../middleWare/CreateCV_Validation");

// isAuthenticated checks whether the current is authenticated.
const isAuthenticated = require("../../middleWare/IsUserAuthenticated");

router.post("/sign_up", form_Validation(), job_Seeker_signUp);
router.post("/login", job_Seeker_login);
router.post("/loginWithGoogle", googleAuth);
router.post("/createCV", CV_Validation(), Create_CV);
router.put("/updateCV", CV_Validation(), CV_Update);
router.get("/userData", isAuthenticated, job_seeker_session);
router.get("/logout", logOut);
router.delete("/deleteUser/:id", deleteUser);

// Keep this route always at the bottom
router.get("/user/:id", isAuthenticated, getUserData);

module.exports = router;

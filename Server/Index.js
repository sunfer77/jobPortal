const express = require('express');
const app = express();
const cors = require('cors');

const job_Seeker_Routes = require('./Routes/Job_Seeker/jobSeekerRoutes');
const job_Routes = require('./Routes/Jobs/JobsRoutes');

app.use(express.json());
app.use(cors());

app.use('/jobSeeker', job_Seeker_Routes); // <------ JobSeeker routes
app.use('/jobs', job_Routes); //  <------job routes
//app.use('/company', employer_Routes); // <------ company routes

app.listen(3001, () => {
	console.log('App is Running on port 3001');
});

const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

const job_Seeker_Routes = require('./Routes/Job_Seeker/jobSeekerRoutes');
const job_Routes = require('./Routes/Jobs/JobsRoutes');
const company_Routes = require('./Routes/Company/CompanyRoutes');

const port = process.env.PORT || 3001;

// Remove or comment out cors() before deploy to heroku
// app.use(
// 	cors({
// 		origin: ['http://localhost:3000'],
// 		methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 		credentials: true,
// 	})
// );

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		key: '_session',
		secret: 'secret',
		resave: false,
		saveUninitialized: false,

		cookie: {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

app.use('/jobSeeker', job_Seeker_Routes);
app.use('/jobs', job_Routes);
app.use('/company', company_Routes);

app.listen(port, () => {
	console.log(`App Is Running on ${port}`);
});

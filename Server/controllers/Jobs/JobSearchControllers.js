const db = require('../../db');

const job_search_controller = (req, res) => {
	const { jobName, city } = req.body;

	const jobSearch = `SELECT  
	jobs.jobId,
	jobs.companyId,
	jobs.jobName,
	jobs.contractType, 
	jobs.sector, 
	jobs.city, 
	jobs.jobDescription, 
	company.companyName, 
	company.email 
	FROM jobs 
	JOIN company ON company.companyId = jobs.companyId 
	WHERE  jobs.jobName LIKE '%${jobName}%' AND jobs.city = '${city}';`;

	// main job search
	db.query(jobSearch, (err, result) => {
		try {
			if (result.length > 0) {
				res.status(200).json(result);
				console.log(result);
			} else {
				res.send(`Sorry no jobs found regarding '${jobName}'`);
				console.log(err);
			}
		} catch (error) {
			res.send(error);
		}
	});
};

// search job by id
const jobs_by_id = (req, res) => {
	const { id } = req.params;

	let jobs = `SELECT  
	jobs.jobId,
	jobs.companyId,
	jobs.jobName,
	jobs.contractType, 
	jobs.sector, 
	jobs.city, 
	jobs.jobDescription, 
	company.companyName, 
	company.email 
	FROM jobs 
	JOIN company ON company.companyId = jobs.companyId 
	WHERE  jobs.jobId = '${id}';`;

	db.query(jobs, (err, result) => {
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

module.exports = {
	job_search_controller,
	jobs_by_id,
};

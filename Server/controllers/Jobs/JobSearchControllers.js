const db = require("../../db");

const job_search_controller = (req, res) => {
  const {
    jobName,
    city
  } = req.body;

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

  // ----------------------------------------------------
  // --------------------  main job search --------------
  // ----------------------------------------------------

  db.query(jobSearch, (err, result) => {
        try {
          if (err) {
            throw err;
          } else if (result.length > 0) {
            res.status(200).json(result);
          } else {
        res.send({
          NojobsFound: true,
          jobName: jobName,
          city: city
        });
        }
        }
        catch (error) {
          res.send(error);
        }
        });
};

// ----------------------------------------------------
// --------------------   get jobs by jobId -----------
// ----------------------------------------------------

const jobs_by_id = (req, res) => {
  const {
    id
  } = req.params;

  let jobs = `SELECT
	jobs.jobId,
	jobs.companyId,
	jobs.jobName,
	jobs.contractType,
	  jobs.sector,
	  jobs.city,
	  jobs.jobDescription,
	  company.companyName,
	company.companyId,
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

// ----------------------------------------------------
// --------------   get jobs by jcompany Id -----------
// ----------------------------------------------------

const jobs_by_companyID = (req, res) => {
  const {
    id
  } = req.params;
  const jobsByCompany = `SELECT * FROM jobs WHERE companyId = '${id}' ;`;
  try {
    db.query(jobsByCompany, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  job_search_controller,
  jobs_by_id,
  jobs_by_companyID,
};
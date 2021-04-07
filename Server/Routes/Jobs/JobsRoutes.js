const express = require('express');
const router = express.Router();
const jobsController = require('../../controllers/Jobs/JobSearchControllers');

// job search
router.post('/jobSearch', jobsController.job_search_controller);

// get a single job by id
router.get('/:id', jobsController.jobs_by_id);

module.exports = router;

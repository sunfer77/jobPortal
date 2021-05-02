import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../Job_Search/JobSearchProvider';
import './ListOfJobs.css';

function ListOfJobs() {
	const { isLoading, jobList, setfireRedirect } = useContext(userContext);

	useEffect(() => {
		setfireRedirect(false);
	});

	return isLoading ? (
		<h3>Loading....</h3>
	) : (
		<div className='jobList'>
			{jobList.NojobsFound ? (
				<h3>No Jobs found regarding {jobList.jobName}</h3>
			) : (
				jobList.reverse().map((job) => {
					return (
						<Link style={{ textDecoration: 'none' }} to={`job/${job.jobId}`}>
							<div key={job.jobId} className='singleJob'>
								<h3>{job.jobName}</h3>
								<p>{job.companyName}</p>
								<p>{job.city}</p>
							</div>
						</Link>
					);
				})
			)}
		</div>
	);
}

export default ListOfJobs;

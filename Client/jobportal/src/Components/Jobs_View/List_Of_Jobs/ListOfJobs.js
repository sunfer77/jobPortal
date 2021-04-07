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
		<div className='Listcontaier'>
			{jobList.includes('Sorry no jobs found regarding') ? (
				<h3>{jobList}</h3>
			) : (
				jobList.map((job) => {
					return (
						<Link to={`job/${job.jobId}`}>
							<div key={job.jobId} className='coleft'>
								<h3>{job.jobName}</h3>
								<p>
									{job.companyName}, {job.city}
								</p>
							</div>
						</Link>
					);
				})
			)}
		</div>
	);
}

export default ListOfJobs;

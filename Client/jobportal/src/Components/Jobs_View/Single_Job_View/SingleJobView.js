import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SingleJobView.css';
function SingleJobView() {
	const { id } = useParams();
	let [job, setJob] = useState({});

	try {
		useEffect(() => {
			axios
				//.get(`http://localhost:3001/jobs/${id}`)
				.get(`https://job-app-react.herokuapp.com/jobs/${id}`)
				.then((response) => {
					setJob(response.data[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		}, [id]);
	} catch (error) {
		console.log(error);
	}

	return (
		<div className='job'>
			<div className='job-name'>
				<h2>{job.jobName}</h2>
			</div>

			<div className='job-description'>
				<p>{job.companyName}</p>
				<p>{job.city}</p>
				<p>{job.contractType}</p>
			</div>
			<p className='description'>{job.jobDescription}</p>
			<p>Please send your CV to {job.email}</p>
			<div className='more-jobs'>
				<Link
					style={{ textDecoration: 'none' }}
					to={`/company/${job.companyId}`}>
					<p> More Jobs from {job.companyName}</p>
				</Link>
			</div>
		</div>
	);
}

export default SingleJobView;

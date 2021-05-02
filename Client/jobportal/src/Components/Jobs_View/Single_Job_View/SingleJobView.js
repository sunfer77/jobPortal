import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './SingleJobView.css';

function SingleJobView() {
	const { id } = useParams();
	let [job, setJob] = useState({});

	try {
		useEffect(() => {
			axios
				.get(`http://localhost:3001/jobs/${id}`)
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
			<div className='job-description'>
				<h3>{job.jobName}</h3>
				<p>{job.companyName}</p>
				<p>{job.city}</p>
			</div>
			<p className='description'>{job.jobDescription}</p>
			<h4>Please send your CV to {job.email}</h4>
		</div>
	);
}

export default SingleJobView;

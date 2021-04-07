import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './SingleJobView.css';

function SingleJobView() {
	const { id } = useParams();
	let [job, setJob] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:3001/jobs/${id}`)
			.then((response) => {
				//localStorage.setItem('singleJob', JSON.stringify(response.data[0]));
				//setJob(JSON.parse(localStorage.getItem('singleJob')));
				setJob(response.data[0]);
				console.log(response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<div className='job'>
			<div className='job-description'>
				<h2>{job.jobName}</h2>
				<p>{job.companyName}</p>
				<p>{job.city}</p>
			</div>
			<p>{job.jobDescription}</p>
			<h4>Send your CV to {job.email}</h4>
		</div>
	);
}

export default SingleJobView;

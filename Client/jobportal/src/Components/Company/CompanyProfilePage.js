import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CompanyProfilePage.css';

function CompanyProfilePage() {
	const { id } = useParams();
	const [company, setCompany] = useState([]);
	const [jobList, setJobList] = useState([]);

	try {
		useEffect(() => {
			axios
				// .get(`http://localhost:3001/company/${id}`)
				.get(`https://job-app-react.herokuapp.com/company/${id}`)
				.then((response) => {
					setCompany(response.data[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		}, [id]);
	} catch (error) {
		console.log(error);
	}

	try {
		useEffect(() => {
			axios
				// .get(`http://localhost:3001/jobs/company/${id}`)
				.get(`https://job-app-react.herokuapp.com/jobs/company/${id}`)
				.then((response) => {
					setJobList(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}, [id]);
	} catch (error) {
		console.log(error);
	}

	return (
		<div className='company'>
			<div className='company-details'>
				<h1>{company.companyName}</h1>
				<p>
					{company.region}, {company.city}
				</p>
			</div>
			<div className='description'>
				<p>{company.aboutCompany}</p>
			</div>

			<div className='job-List'>
				<div className='active-jobs'>
					<p>Active Jobs</p>
				</div>

				{jobList.reverse().map((job) => {
					return (
						<Link style={{ textDecoration: 'none' }} to={`/job/${job.jobId}`}>
							<div key={job.jobId} className='single-Job'>
								<h4>{job.jobName}</h4>
								<p>{job.city}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default CompanyProfilePage;

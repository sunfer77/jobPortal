import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CandidateContext } from '../JobSeeker_Login/UserContext';
import axios from 'axios';
import './FinalizedUserCV.css';

function FinalizedUserCV() {
	const { userData } = useContext(CandidateContext);
	const [JobSeekerData, setJobSeekerData] = useState([]);
	try {
		useEffect(() => {
			axios
				.get(`http://localhost:3001/jobSeeker/${userData.id}`)
				.then((response) => {
					setJobSeekerData(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [userData.id]);
	} catch (error) {
		console.log(error);
	}
	return (
		<div className='main_div'>
			<div className='cv'>
				<p>
					<span>Name - </span>
					{JobSeekerData.firstName} {JobSeekerData.lasttName}
				</p>
				<p>
					<span>City - </span>
					{JobSeekerData.city}
				</p>
				<p>
					<span>Region - </span>
					{JobSeekerData.region}
				</p>
				<div className='aboutMe'>
					<p>{JobSeekerData.aboutMe}</p>
				</div>

				<Link style={{ textDecoration: 'none' }} to='/JobSeekerEditProfile'>
					<p>
						<i className='far fa-edit'></i> Edit Your CV
					</p>
				</Link>
			</div>
		</div>
	);
}

export default FinalizedUserCV;

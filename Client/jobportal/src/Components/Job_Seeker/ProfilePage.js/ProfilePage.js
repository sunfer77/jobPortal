import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CandidateContext } from '../JobSeeker_Login/UserContext';
import axios from 'axios';
import './ProfilePage.css';

function ProfilePage() {
	const { userData } = useContext(CandidateContext);
	const [isCvCreated, setIsCvCreated] = useState([]);

	// *  "isCvCreated.CvCreated" used to prevent showing "Edit Your CV" to newly registered users that they have not created a CV yet!
	// *   and also used to show "Edit Your CV" to the users those have already created the CV.

	try {
		useEffect(() => {
			userData.isAuthenticated &&
				axios
					.get(`http://localhost:3001/jobSeeker/${userData.id}`)
					.then((response) => {
						setIsCvCreated(response.data);
					})
					.catch((err) => {
						console.log(err);
					});
		}, [userData.id, userData.isAuthenticated]);
	} catch (error) {
		console.log(error);
	}

	return (
		<div className='mainDiv'>
			<div className='profile'>
				{userData.isAuthenticated && !isCvCreated.CvCreated ? (
					<div className='actionDiv'>
						<Link style={{ textDecoration: 'none' }} to='/CreateCV'>
							<p>
								<i className='fas fa-newspaper'></i>Create CV
							</p>
						</Link>
					</div>
				) : null}

				{userData.isAuthenticated && isCvCreated.CvCreated ? (
					<div className='actionDiv'>
						<Link style={{ textDecoration: 'none' }} to='/FinalizedUserCV'>
							<p>
								<i className='fas fa-newspaper'></i>View Your CV
							</p>
						</Link>
					</div>
				) : null}

				{userData.isAuthenticated && isCvCreated.CvCreated ? (
					<div className='actionDiv'>
						<Link style={{ textDecoration: 'none' }} to='/JobSeekerEditProfile'>
							<p>
								<i className='far fa-edit'></i> Edit Your CV
							</p>
						</Link>
					</div>
				) : null}

				{userData.isAuthenticated ? (
					<div className='actionDiv'>
						<Link style={{ textDecoration: 'none' }} to='/CreateCV'>
							<p>
								<i className='far fa-trash-alt'></i> Delete my account
							</p>
						</Link>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ProfilePage;

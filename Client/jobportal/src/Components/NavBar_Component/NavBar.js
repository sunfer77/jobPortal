import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CandidateContext } from '../Job_Seeker/JobSeeker_Login/UserContext';
import axios from 'axios';

import './NavBar.css';

function NavBar() {
	const { userData } = useContext(CandidateContext);
	const [isCvCreated, setIsCvCreated] = useState([]);

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

	return (
		<header>
			<Link className='logo' to='/'>
				<h2>M</h2>
			</Link>
			<ul className='navigation'>
				{userData.isAuthenticated ? null : (
					<Link style={{ textDecoration: 'none' }} to='/JobSeekerSignup'>
						<li>Sign Up</li>
					</Link>
				)}

				{userData.isAuthenticated ? null : (
					<Link style={{ textDecoration: 'none' }} to='/JobSeekerLogin'>
						<li>login</li>
					</Link>
				)}

				{userData.isAuthenticated && !isCvCreated.CvCreated ? (
					<Link style={{ textDecoration: 'none' }} to='/CreateCV'>
						<li>Create CV</li>
					</Link>
				) : null}

				{userData.isAuthenticated && isCvCreated.CvCreated ? (
					<Link style={{ textDecoration: 'none' }} to='/JobSeekerEditProfile'>
						<li>Update CV</li>
					</Link>
				) : null}
				{userData.isAuthenticated ? (
					<li>
						<span>Hello! {userData.userName}</span>
					</li>
				) : null}
			</ul>
		</header>
	);
}

export default NavBar;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CandidateContext } from '../Job_Seeker/JobSeeker_Login/UserContext';
import axios from 'axios';
import './NavBar.css';

function NavBar() {
	const { userData } = useContext(CandidateContext);

	const logout = () => {
		try {
			axios
				.get('http://localhost:3001/jobSeeker/logout')
				.then(() => {
					window.location.assign('/');
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<header>
			<Link className='logo' to='/'>
				<h2>M</h2>
			</Link>
			<ul className='navigation'>
				{/* Display if User is NOT logged in */}
				{userData.isAuthenticated ? null : (
					<>
						<Link style={{ textDecoration: 'none' }} to='/JobSeekerSignup'>
							<li>Sign Up</li>
						</Link>
						<Link style={{ textDecoration: 'none' }} to='/JobSeekerLogin'>
							<li>login</li>
						</Link>
					</>
				)}
				{/* Display if User IS logged in */}
				{userData.isAuthenticated ? (
					<>
						<Link style={{ textDecoration: 'none' }} to='/ProfilePage'>
							<li>
								<span>Hello! {userData.userName}</span>
								<i className='fas fa-user-circle'></i>
							</li>
						</Link>
						<li onClick={logout}>Logout</li>
					</>
				) : null}
			</ul>
		</header>
	);
}

export default NavBar;

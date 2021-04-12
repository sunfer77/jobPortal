import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { CandidateContext } from '../Job_Seeker/JobSeeker_Login/UserContext';
function NavBar() {
	const { userData } = useContext(CandidateContext);
	return (
		<header>
			<Link className='logo' to='/'>
				<h2>M</h2>
			</Link>

			<ul className='navigation'>
				{userData.isAuthenticated ? null : (
					<Link to='/JobSeekerSignup'>
						<li>Sign Up</li>
					</Link>
				)}

				{userData.isAuthenticated ? null : (
					<Link to='/JobSeekerLogin'>
						<li>login</li>
					</Link>
				)}

				{userData.isAuthenticated ? (
					<Link to='/CreateCV'>
						<li>Create CV</li>
					</Link>
				) : null}

				{userData.isAuthenticated ? (
					<Link to='/JobSeekerEditProfile'>
						<li>Update CV</li>
					</Link>
				) : null}
				{userData.isAuthenticated ? (
					<Link to='/JobSeekerEditProfile'>
						<li>Profile</li>
					</Link>
				) : null}
				{userData.isAuthenticated ? (
					<Link to='/JobSeekerEditProfile'>
						<li>Logout</li>
					</Link>
				) : null}
			</ul>
		</header>
	);
}

export default NavBar;

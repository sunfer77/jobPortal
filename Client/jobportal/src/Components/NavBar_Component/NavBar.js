import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
	return (
		<header>
			<Link className='logo' to='/'>
				<h2>M</h2>
			</Link>

			<ul className='navigation'>
				<Link to='/'>
					<li>Home</li>
				</Link>
				<Link to='/JobSeekerSignup'>
					<li>Sign Up</li>
				</Link>
				<Link to='/UserContext'>
					<li>login</li>
				</Link>
			</ul>
		</header>
	);
}

export default NavBar;

import React, { useState, createContext, useEffect } from 'react';

import axios from 'axios';

export const CandidateContext = createContext();

function UserContext({ children }) {
	axios.defaults.withCredentials = true;

	const [userData, setUserData] = useState([]);

	const submitForm = (data) => {
		axios
			.post('http://localhost:3001/jobSeeker/login', data)
			.then((response) => {
				setUserData(response.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	// Get User information from back end if user successfully logged in.
	try {
		useEffect(() => {
			axios
				.get('http://localhost:3001/jobSeeker/login')
				.then((response) => {
					setUserData(response.data);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}, []);
	} catch (error) {
		console.log(error);
	}

	return (
		<CandidateContext.Provider value={{ submitForm, userData }}>
			{children}
		</CandidateContext.Provider>
	);
}

export default UserContext;

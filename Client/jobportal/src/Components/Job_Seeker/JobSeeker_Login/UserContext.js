import React, { useState, createContext } from 'react';
import axios from 'axios';

export const CandidateContext = createContext();

function UserContext({ children }) {
	const [userData, setUserData] = useState([]);

	const submitForm = (data) => {
		axios
			.post('http://localhost:3001/jobSeeker/login', data)
			.then((response) => {
				setUserData(response.data);
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<CandidateContext.Provider value={{ submitForm, userData }}>
			{children}
		</CandidateContext.Provider>
	);
}

export default UserContext;

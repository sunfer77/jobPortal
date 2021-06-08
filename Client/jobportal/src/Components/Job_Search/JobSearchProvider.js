import React, { useState, createContext } from 'react';
import axios from 'axios';
import './JobSearch.css';

// * User Context
export const userContext = createContext({});

function JobSearchProvider(props) {
	const [jobList, setjobList] = useState([]);
	const [fireRedirect, setfireRedirect] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const findJobs = async (data) => {
		await axios
			//.post('http://localhost:3001/jobs/jobSearch', data)
			.post('https://job-app-react.herokuapp.com/jobs/jobSearch', data)
			.then((response) => {
				setIsLoading(true);
				setjobList(response.data);
				console.log(response.data);
				setfireRedirect(true);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<userContext.Provider
			value={{ findJobs, jobList, fireRedirect, setfireRedirect, isLoading }}>
			{props.children}
		</userContext.Provider>
	);
}

export default JobSearchProvider;

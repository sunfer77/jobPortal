import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CandidateContext } from './Job_Seeker/JobSeeker_Login/UserContext';

function ProtectedRoutes({ component: Component, ...rest }) {
	const { userData } = useContext(CandidateContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (userData.isAuthenticated) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/JobSeekerLogin',
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
}
export default ProtectedRoutes;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import JobSearchProvider from './Components/Job_Search/JobSearchProvider';
import JobSearch from './Components/Job_Search/JobSearch';
import NavBar from './Components/NavBar_Component/NavBar';
import SingleJobView from './Components/Jobs_View/Single_Job_View/SingleJobView';
import About from './Components/About_Component/About';
import ListOfJobs from './Components/Jobs_View/List_Of_Jobs/ListOfJobs';
import JobSeekerSignup from './Components/Job_Seeker/JobSeeker_SignUp/JobSeekerSignup';
import UserContext from './Components/Job_Seeker/JobSeeker_Login/UserContext';
import JobSeekerEditProfile from './Components/Job_Seeker/JobSeeker_Edit_Profile/JobSeekerEditProfile';
import CreateCV from './Components/Job_Seeker/CV/CreateCV';
import JobSeekerLogin from './Components/Job_Seeker/JobSeeker_Login/JobSeekerLogin';
import ProtectedRoutes from './Components/ProtectedRoutes';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<UserContext>
					<NavBar />

					<Switch>
						<JobSearchProvider>
							{/* <UserContext> */}
							<Route exact path='/' component={JobSearch} />
							<Route exact path='/About' component={About} />
							<Route exact path='/ListOfJobs' component={ListOfJobs} />
							<Route exact path='/job/:id' component={SingleJobView} />

							<Route
								exact
								path='/JobSeekerSignup'
								component={JobSeekerSignup}
							/>
							<Route exact path='/JobSeekerLogin' component={JobSeekerLogin} />
							<ProtectedRoutes path='/CreateCV' component={CreateCV} />
							<ProtectedRoutes
								exact
								path='/JobSeekerEditProfile'
								component={JobSeekerEditProfile}
							/>
						</JobSearchProvider>
					</Switch>
				</UserContext>
			</Router>
		</div>
	);
}

export default App;

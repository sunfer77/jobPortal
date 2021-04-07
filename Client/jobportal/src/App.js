import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JobSearch from './Components/Job_Search/JobSearch';
import JobSearchProvider from './Components/Job_Search/JobSearchProvider';
import NavBar from './Components/NavBar_Component/NavBar';
import SingleJobView from './Components/Jobs_View/Single_Job_View/SingleJobView';
import './App.css';
import About from './Components/About_Component/About';
import ListOfJobs from './Components/Jobs_View/List_Of_Jobs/ListOfJobs';
import JobSeekerSignup from './Components/Job_Seeker/JobSeeker_SignUp/JobSeekerSignup';
import UserContext from './Components/Job_Seeker/JobSeeker_Login.js/UserContext';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Switch>
					<JobSearchProvider>
						<Route exact path='/' component={JobSearch} />
						<Route exact path='/About' component={About} />
						<Route exact path='/ListOfJobs' component={ListOfJobs} />
						<Route exact path='/job/:id' component={SingleJobView} />
						<Route exact path='/JobSeekerSignup' component={JobSeekerSignup} />
						<Route exact path='/UserContext' component={UserContext} />
					</JobSearchProvider>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

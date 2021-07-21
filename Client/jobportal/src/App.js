import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import JobSearchProvider from "./Components/Job_Search/JobSearchProvider";
import JobSearch from "./Components/Job_Search/JobSearch";
import NavBar from "./Components/NavBar_Component/NavBar";
import SingleJobView from "./Components/Jobs_View/Single_Job_View/SingleJobView";
import ListOfJobs from "./Components/Jobs_View/List_Of_Jobs/ListOfJobs";
import JobSeekerSignup from "./Components/Job_Seeker/JobSeeker_SignUp/JobSeekerSignup";
import UserContext from "./Components/Job_Seeker/JobSeeker_Login/UserContext";
import JobSeekerEditProfile from "./Components/Job_Seeker/JobSeeker_Edit_Profile/JobSeekerEditProfile";
import CreateCVProvider from "./Components/Job_Seeker/CV/CreateCVProvider";
import CreateCV from "./Components/Job_Seeker/CV/CreateCV";
import JobSeekerLogin from "./Components/Job_Seeker/JobSeeker_Login/JobSeekerLogin";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ProfilePage from "./Components/Job_Seeker/ProfilePage.js/ProfilePage";
import FinalizedUserCV from "./Components/Job_Seeker/CV/FinalizedUserCV";
import CompanyProfilePage from "./Components/Company/CompanyProfilePage";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContext>
          <JobSearchProvider>
            <CreateCVProvider>
              <NavBar />
              <Switch>
                <Route exact path="/" component={JobSearch} />
                <Route exact path="/ListOfJobs" component={ListOfJobs} />
                <Route exact path="/job/:id" component={SingleJobView} />
                <Route
                  exact
                  path="/JobSeekerSignup"
                  component={JobSeekerSignup}
                />
                <Route
                  exact
                  path="/JobSeekerLogin"
                  component={JobSeekerLogin}
                />
                <Route
                  exact
                  path="/company/:id"
                  component={CompanyProfilePage}
                />
                <ProtectedRoutes
                  exact
                  path="/ProfilePage"
                  component={ProfilePage}
                />
                <ProtectedRoutes exact path="/CreateCV" component={CreateCV} />
                <ProtectedRoutes
                  exact
                  path="/FinalizedUserCV"
                  component={FinalizedUserCV}
                />
                <ProtectedRoutes
                  exact
                  path="/JobSeekerEditProfile"
                  component={JobSeekerEditProfile}
                />
              </Switch>
            </CreateCVProvider>
          </JobSearchProvider>
        </UserContext>
      </Router>
    </div>
  );
}

export default App;

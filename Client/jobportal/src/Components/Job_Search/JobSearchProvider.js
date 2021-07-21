import React, { useState, createContext } from "react";
import axios from "axios";
import "./JobSearch.css";

// * User Context
export const jobsContext = createContext({});

function JobSearchProvider(props) {
  const [jobList, setjobList] = useState([]);

  // fireRedirect used to redirect user to listOfJobs page after obtained searched result from db.
  const [fireRedirect, setfireRedirect] = useState(false);
  //----------------------------------------------------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const findJobs = async (data) => {
    setIsLoading(true);
    await axios
      // .post("http://localhost:3001/jobs/jobSearch", data)
      .post("https://job-app-react.herokuapp.com/jobs/jobSearch", data)
      .then((response) => {
        setjobList(response.data);
        setfireRedirect(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <jobsContext.Provider
      value={{ findJobs, jobList, fireRedirect, setfireRedirect, isLoading }}
    >
      {props.children}
    </jobsContext.Provider>
  );
}

export default JobSearchProvider;

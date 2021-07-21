import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CompanyProfilePage.css";

// -------------------------------------------------------------------------------------------------------- //
// This CompanyProfilePage.js used to display "More jobs from ${company name}" in the single job view Page
// once user redirected to "/company/${job.companyId}"
// -------------------------------------------------------------------------------------------------------- //

function CompanyProfilePage() {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const [jobList, setJobList] = useState([]);

  // ---------------------------------------------------------- //
  // ---------------- Getting Company details by Id ------------- //
  // ---------------------------------------------------------- //
  try {
    useEffect(() => {
      const abortCont = new AbortController();
      axios
        // .get(`http://localhost:3001/company/${id}`, {
        //   signal: abortCont.signal,
        // })
        .get(`https://job-app-react.herokuapp.com/company/${id}`, {
          signal: abortCont.signal,
        })
        .then((response) => {
          setCompany(response.data[0]);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            console.log(err);
          }
        });
      // ---------------------------------------------------------- //
      // ---------------- useEffect clean Up Function ------------- //
      // ---------------------------------------------------------- //
      return () => abortCont.abort();
    }, [id]);
  } catch (err) {
    console.log(err);
  }

  // ---------------------------------------------------------- //
  // ---------------- get jobs by company Id ------------- //
  // ---------------------------------------------------------- //
  useEffect(() => {
    const abortCont = new AbortController();
    axios
      // .get(`http://localhost:3001/jobs/company/${id}`, {
      //   signal: abortCont.signal,
      // })
      .get(`https://job-app-react.herokuapp.com/jobs/company/${id}`, {
        signal: abortCont.signal,
      })
      .then((response) => {
        setJobList(response.data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Aborted");
        } else {
          console.log(err);
        }
      });
    // ---------------------------------------------------------- //
    // ---------------- useEffect clean Up Function ------------- //
    // ---------------------------------------------------------- //
    return () => abortCont.abort();
  }, [id]);

  return (
    // --------------------------------------------------------------- //
    //-------------------  Company basic details  -------------------- //
    //---------------------------------------------------------------- //
    <div className="company">
      <div className="company-details">
        <h1>{company.companyName}</h1>
        <p>
          {company.region}, {company.city}
        </p>
      </div>
      <div className="description">
        <p>{company.aboutCompany}</p>
      </div>

      <div className="job-List">
        <div className="active-jobs">
          <p>Active Jobs</p>
        </div>
        {/* ----------------------------------------------------------------------*/}
        {/*Mapping through and display active list of jobs of the specific Company*/}
        {/* ----------------------------------------------------------------------*/}
        {jobList
          .map((job) => {
            return (
              <div key={job.jobId} className="single-Job">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/job/${job.jobId}`}
                >
                  <h4>{job.jobName}</h4>
                  <p>{job.city}</p>
                </Link>
              </div>
            );
          })
          .reverse()}
        {/*-------------Show lastest jobs-----------------*/}
      </div>
    </div>
  );
}

export default CompanyProfilePage;

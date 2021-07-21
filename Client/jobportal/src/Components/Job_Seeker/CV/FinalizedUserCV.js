import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CandidateContext } from "../JobSeeker_Login/UserContext";
import axios from "axios";
import "./FinalizedUserCV.css";

function FinalizedUserCV() {
  const { userData } = useContext(CandidateContext);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  try {
    useEffect(() => {
      const abortCont = new AbortController();
      axios
        // .get(`http://localhost:3001/jobSeeker/user/${userData.id}`, {
        //   signal: abortCont.signal,
        // })
        .get(
          `https://job-app-react.herokuapp.com/jobSeeker/user/${userData.id}`,
          { signal: abortCont.signal }
        )
        .then((response) => {
          setJobSeekerData(response.data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            console.log(err.message);
          }
        });
      return () => abortCont.abort();
    }, [userData.id]);
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="main_div">
      <div className="cv">
        <p>
          <span>Name - </span>
          {JobSeekerData.firstName} {JobSeekerData.lasttName}
        </p>
        <p>
          <span>Surname - </span>
          {JobSeekerData.lastName} {JobSeekerData.lasttName}
        </p>
        <p>
          <span>City - </span>
          {JobSeekerData.city}
        </p>
        <p>
          <span>Region - </span>
          {JobSeekerData.region}
        </p>
        <div className="aboutMe">
          <p>{JobSeekerData.aboutMe}</p>
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to="/JobSeekerEditProfile"
        ></Link>
        <p>
          <span>
            <i className="fas fa-newspaper"></i>
          </span>
          My Work
        </p>
        <p>
          <span>
            <i className="fab fa-github"></i>
          </span>
          GitHub
        </p>
        <div className="editCV">
          <Link style={{ textDecoration: "none" }} to="/JobSeekerEditProfile">
            <p>
              <i className="far fa-edit"></i> Edit Your CV
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FinalizedUserCV;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CandidateContext } from "../Job_Seeker/JobSeeker_Login/UserContext";
import axios from "axios";
import "./NavBar.css";

function NavBar() {
  const { userData } = useContext(CandidateContext);

  // ----------------------------------------------------
  // -------------------- Log out function --------------
  // ----------------------------------------------------
  const logout = () => {
    try {
      axios
        //.get("http://localhost:3001/jobSeeker/logout")
        .get("https://job-app-react.herokuapp.com/jobSeeker/logout")
        .then((response) => {
          window.location.assign("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Link className="logo" to="/">
        <h2>Jobs</h2>
      </Link>
      {/* ---------------------------------------------------------------------------*/}
      {/* ----------------------Display once the user is authenticated --------------------*/}
      {/* ---------------------------------------------------------------------------*/}
      <ul className="navigation">
        {userData.isAuthenticated ? (
          <>
            <Link to="/ProfilePage">
              <li>
                <i
                  style={{ color: "#28aa41" }}
                  className="fas fa-user-circle"
                  id="icon"
                ></i>
              </li>
            </Link>
            <div className="logout">
              <li onClick={logout}>
                <i id="icon" className="fas fa-sign-out-alt"></i>
              </li>
            </div>
          </>
        ) : (
          <Link to="/JobSeekerLogin">
            {/* -----------------------------------------------------------------------------------*/}
            {/* ----------------------Display if the user is not authenticated --------------------*/}
            {/* -----------------------------------------------------------------------------------*/}
            <i
              style={{ color: "#8F9296" }}
              className="fas fa-user-circle"
              id="icon"
            ></i>
          </Link>
        )}
      </ul>
    </header>
  );
}

export default NavBar;

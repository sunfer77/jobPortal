import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CandidateContext } from "../JobSeeker_Login/UserContext";
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {
  const { userData } = useContext(CandidateContext);
  const [isCvCreated, setIsCvCreated] = useState([]);

  // -----------------------------------------------------------------------------------------------------------------------------------
  // *  "isCvCreated.CvCreated" used to prevent showing "Edit Your CV" to newly registered users that they have not created a CV yet!
  // *   and also used to show "Edit Your CV" to the users those have already created the CV.
  // -----------------------------------------------------------------------------------------------------------------------------------
  try {
    useEffect(() => {
      const abortCont = new AbortController();
      userData.isAuthenticated &&
        axios
          // .get(`http://localhost:3001/jobSeeker/user/${userData.id}`, {
          //   signal: abortCont.signal,
          // })
          .get(
            `https://job-app-react.herokuapp.com/jobSeeker/user/${userData.id}`,
            { signal: abortCont.signal }
          )
          .then((response) => {
            setIsCvCreated(response.data);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Aborted");
            } else {
              console.log(err);
            }
          });
      return () => abortCont.abort();
    }, [userData.id, userData.isAuthenticated]);
  } catch (error) {
    console.log(error);
  }

  // ----------------------------------------------------------------
  // Logout Function
  // ----------------------------------------------------------------
  const logout = () => {
    try {
      axios
        // .get("http://localhost:3001/jobSeeker/logout")
        .get("https://job-app-react.herokuapp.com/jobSeeker/logout")
        .then(() => {
          window.location.assign("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------------------------------------
  // Delete User function
  // ----------------------------------------------------------------
  const deleteUser = async () => {
    try {
      axios
        //.delete(`http://localhost:3001/jobSeeker/deleteUser/${userData.id}`)
        .delete(
          `https://job-app-react.herokuapp.com/jobSeeker/deleteUser/${userData.id}`
        )
        .then(() => {
          alert("Deleted");
          logout();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainDiv">
      <div className="profile">
        {/* ----------------------------------------------------------------------------------- */}
        {/*       Is current user is authenticated? show username*/}
        {/* ----------------------------------------------------------------------------------- */}
        {userData.isAuthenticated && (
          <div id="user">
            <p>
              <span>Hello! {userData.userName}</span>
            </p>
          </div>
        )}

        {/* ----------------------------------------------------------------------------------- */}
        {/* Is the current user is authenticated and still not created CV ? display "create CV" */}
        {/* ----------------------------------------------------------------------------------- */}
        {userData.isAuthenticated && !isCvCreated.CvCreated ? (
          <div className="actionDiv">
            <Link style={{ textDecoration: "none" }} to="/CreateCV">
              <p>
                <i className="fas fa-newspaper"></i>Create CV
              </p>
            </Link>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------------------- */}
        {/* Is the current user authenticated and has created CV... display "View CV" */}
        {/* ---------------------------------------------------------------------------- */}
        {userData.isAuthenticated && isCvCreated.CvCreated ? (
          <div className="actionDiv">
            <Link style={{ textDecoration: "none" }} to="/FinalizedUserCV">
              <p>
                <i className="fas fa-newspaper"></i>View Your CV
              </p>
            </Link>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------------------- */}
        {/* Is the current user authenticated and has created CV... display "Edit CV" */}
        {/* ---------------------------------------------------------------------------- */}
        {userData.isAuthenticated && isCvCreated.CvCreated ? (
          <div className="actionDiv">
            <Link style={{ textDecoration: "none" }} to="/JobSeekerEditProfile">
              <p>
                <i className="far fa-edit"></i> Edit Your CV
              </p>
            </Link>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------------------- */}
        {/* Delete user account */}
        {/* ---------------------------------------------------------------------------- */}
        {userData.isAuthenticated ? (
          <div className="actionDiv">
            <p onClick={deleteUser}>
              <i style={{ color: "red" }} className="far fa-trash-alt"></i>
              Delete my account
            </p>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------------------- */}
        {/* Logout user */}
        {/* ---------------------------------------------------------------------------- */}
        {userData.isAuthenticated ? (
          <div className="actionDiv">
            <p onClick={logout}>
              <i
                style={{ color: "#f7aa63" }}
                className="fas fa-sign-out-alt"
              ></i>
              Logout
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProfilePage;

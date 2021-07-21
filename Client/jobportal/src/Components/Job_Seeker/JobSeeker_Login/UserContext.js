import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const CandidateContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState([]);
  const [authentcating, setAuthenticating] = useState(false);

  axios.defaults.withCredentials = true;

  // -------------------------------------------------------------------------
  // Get User CV data from back-end if current user is successfully logged in.
  // -------------------------------------------------------------------------
  try {
    useEffect(() => {
      const abortCont = new AbortController();
      axios
        // .get("http://localhost:3001/jobSeeker/userData", {
        //   signal: abortCont.signal,
        // })
        .get("https://job-app-react.herokuapp.com/jobSeeker/userData", {
          signal: abortCont.signal,
        })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            console.log(err.message);
          }
        });
      // -------------------------------------------------------------------------
      // Clean up function
      // -------------------------------------------------------------------------
      return () => abortCont.abort();
    }, []);
  } catch (error) {
    console.log(error);
  }
  // -------------------------------------------------------------------------
  // Sending login data to the backend and varify
  // -------------------------------------------------------------------------
  const submitForm = (data) => {
    setAuthenticating(true);
    axios
      //.post("http://localhost:3001/jobSeeker/login", data)
      .post("https://job-app-react.herokuapp.com/jobSeeker/login", data)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        setAuthenticating(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  // -------------------------------------------------------------------------
  // Googole login
  // -------------------------------------------------------------------------
  const responseGoogle = (googleData) => {
    axios
      // .post("http://localhost:3001/jobSeeker/loginWithGoogle", {
      //   userName: googleData.Ys.Ve,
      //   googleID: googleData.Ys.xS,
      //   email: googleData.Ys.It,
      // })
      .post("https://job-app-react.herokuapp.com/jobSeeker/loginWithGoogle", {
        userName: googleData.Ys.Ve,
        googleID: googleData.Ys.xS,
        email: googleData.Ys.It,
      })
      .then((response) => {
        setUserData(response.data);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <CandidateContext.Provider
      value={{ submitForm, responseGoogle, userData, authentcating }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export default UserContext;

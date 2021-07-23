import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { CandidateContext } from "../JobSeeker_Login/UserContext";

export const CvContext = createContext();

function CreateCVProvider({ children }) {
  const { userData } = useContext(CandidateContext);
  const [cvCreated, setCvCreated] = useState([]);

  const submitForm = (data) => {
    try {
      axios
        .post("https://job-app-react.herokuapp.com/jobSeeker/createCV", {
          ...data,
          id: userData.id,
        })
        // .post("http://localhost:3001/jobSeeker/createCV", {
        //   ...data,
        //   id: userData.id,
        // })
        .then((response) => {
          setCvCreated(response.data);
        });
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <CvContext.Provider value={{ submitForm, cvCreated }}>
      {children}
    </CvContext.Provider>
  );
}

export default CreateCVProvider;

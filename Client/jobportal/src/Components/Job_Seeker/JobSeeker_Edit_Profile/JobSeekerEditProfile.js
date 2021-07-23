import React, { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { CandidateContext } from "../JobSeeker_Login/UserContext";
import "../form.css";

function JobSeekerEditProfile() {
  const { userData } = useContext(CandidateContext);

  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [message, setMessage] = useState([]);

  // -------------------------------------------------------------
  // fetch user data to use as default values in inputs for update
  // -------------------------------------------------------------

  try {
    useEffect(() => {
      const abortCont = new AbortController();
      axios
        .get(
          `https://job-app-react.herokuapp.com/jobSeeker/user/${userData.id}`,
          {
            signal: abortCont.signal,
          }
        )
        // .get(`http://localhost:8001/jobSeeker/user/${userData.id}`, {
        //   signal: abortCont.signal,
        // })
        .then((response) => {
          setJobSeekerData(response.data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            console.log(err);
          }
        });
      return () => abortCont.abort();
    }, [userData.id]);
  } catch (err) {
    console.log(JobSeekerEditProfile);
  }

  // -------------------------------------------------------------
  // Submit updated user data to the database
  // -------------------------------------------------------------

  const submitForm = (data) => {
    try {
      axios
        // .put("http://localhost:3001/jobSeeker/updateCV", {
        //   ...data,
        //   id: userData.id,
        // })
        .put("https://job-app-react.herokuapp.com/jobSeeker/updateCV", {
          ...data,
          id: userData.id,
        })
        .then((response) => {
          setMessage(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    
  };

  // * Yup Form starts here
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .min(2)
      .matches(/^[A-Za-z\s]+$/, "Invalid format"),
    lastName: yup
      .string()
      .required()
      .min(2)
      .matches(/^[A-Za-z\s]+$/, "Invalid format"),
    city: yup
      .string()
      .required()
      .min(2)
      .matches(/^[A-Za-z\s]+$/, "Invalid format"),
    region: yup.string().required().min(2),
    aboutMe: yup.string().required().min(10).max(5000),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <h2> Update Your Profile </h2>
        {/*+++++++++First Name  +++++++++++++++++++++++++++++++++++++++++++++*/}

        <input
          type="text"
          name="firstName"
          defaultValue={JobSeekerData.firstName}
          ref={register}
          placeholder="First Name *"
        />
        {errors.firstName?.type === "required" && <span>Required</span>}
        {errors.firstName?.type === "min" && (
          <span>Please minLength is 2 </span>
        )}
        {errors.firstName?.type === "matches" && <span>invalid format</span>}

        {/*+++++++++ Last Name +++++++++++++++++++++++++++++++++++++++++++++*/}

        <input
          name="lastName"
          defaultValue={JobSeekerData.lastName}
          ref={register}
          placeholder="Last Name *"
        />
        {errors.lastName?.type === "required" && <span>Required</span>}
        {errors.lastName?.type === "min" && <span>Last name is too short</span>}
        {errors.lastName?.type === "matches" && <span>invalid format</span>}

        {/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

        <input
          name="city"
          defaultValue={JobSeekerData.city}
          ref={register}
          placeholder="City *"
        />
        {errors.city?.type === "required" && <span>Required</span>}
        {errors.city?.type === "min" && <span> too short</span>}
        {errors.city?.type === "matches" && <span>invalid format</span>}

        {/*++++++++++++++++++++++++++ E-mail  ++++++++++++++++++++++++++++++*/}

        <input
          name="region"
          defaultValue={JobSeekerData.region}
          ref={register}
          placeholder="Region *"
        />
        {errors.region?.type === "required" && <span>Required</span>}

        {/*+++++++++++++++++++++++++ About You  ++++++++++++++++++++++++++++++++++++++++++*/}

        <textarea
          className="text"
          wrap="off"
          rows="20"
          name="aboutMe"
          defaultValue={JobSeekerData.aboutMe}
          ref={register}
          placeholder="About you *"
        />
        {errors.aboutMe?.type === "required" && <span>Required</span>}
        {errors.aboutMe?.type === "min" && <span>Too Short!</span>}
        <input id="submit" type="submit" />
        <span>{message}</span>
      </form>
    </div>
  );
}

export default JobSeekerEditProfile;

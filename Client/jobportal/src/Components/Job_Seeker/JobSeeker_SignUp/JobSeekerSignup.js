import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../form.css";

function JobseekerSignUp() {
  const [signUpData, setsignUpData] = useState([]);

  const submitForm = (data) => {
    try {
      axios
        //.post("http://localhost:3001/jobSeeker/sign_up", data)
        .post("https://job-app-react.herokuapp.com/jobSeeker/sign_up", data)
        .then((response) => {
          setsignUpData(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
    
  };

  const schema = yup.object().shape({
    userName: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <div className="form-signup">
          <h2>
            <i className="fas fa-sign-in-alt"></i>Sign up
          </h2>
        </div>

        {/* +++++++++ USer Name +++++++++++++++++++++++++++++++++++++++++++++ */}

        <input name="userName" ref={register} placeholder="user name*" />
        {errors.userName?.type === "required" && <span>Required!</span>}
        {errors.userName?.type === "min" && <span>too short</span>}

        {/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

        <input type="text" name="email" ref={register} placeholder="email *" />
        {errors.email?.type === "required" && <span>Required!</span>}
        {errors.email?.type === "min" && <span> too short</span>}
        {errors.email?.type === "email" && <span>invalid format</span>}

        {/*++++++++++++++++++++++++++ E-mail  ++++++++++++++++++++++++++++++*/}

        <input
          type="password"
          name="password"
          ref={register}
          placeholder="password *"
        />
        {errors.password?.type === "required" && <span>Required!</span>}
        {errors.password?.type === "min" && <span>too short</span>}
        <input id="submit" type="submit" />
        <span>{signUpData.message}</span>
      </form>
      <Link to="/JobSeekerLogin">
        <p>Have an account?</p>
      </Link>

      {/* ------------------------------------------ */}
      {/* Redirect User to login page after register */}
      {/* ------------------------------------------ */}

      {signUpData.isRegistered && (
        <Redirect
          to={{
            pathname: "/JobSeekerLogin",
          }}
        />
      )}
    </div>
  );
}

export default JobseekerSignUp;

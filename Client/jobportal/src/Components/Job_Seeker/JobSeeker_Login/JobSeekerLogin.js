import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import GoogleLogin from "react-google-login";
import { CandidateContext } from "./UserContext";
import "../form.css";

function JobSeekerLogin() {
  const { submitForm, responseGoogle, userData, authentcating } =
    useContext(CandidateContext);

  // ------------ Yup Form starts here --------------

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required()
      .matches(/^[A-Za-z\s]+$/, "Invalid format"),
    password: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // ------------ Yup Form ends here --------------

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <div className="login">
          <h2>
            <i className="fas fa-sign-in-alt"></i>Login
          </h2>
        </div>

        <input name="userName" ref={register} placeholder="user name*" />
        {errors.userName?.type === "required" && <span>Required!</span>}
        {errors.userName?.type === "min" && <span>too short</span>}
        {errors.userName?.type === "matches" && <span>invalid format</span>}

        {/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

        <input
          type="password"
          name="password"
          ref={register}
          placeholder="password *"
        />
        {errors.password?.type === "required" && <span>Required!</span>}
        {errors.password?.type === "min" && <span>too short</span>}

        <input id="submit" type="submit" />
      </form>
      <div>
        <p>Or</p>
      </div>

      {/*---------------------------------------------- */}
      {/* ----------- Login with Google ----------------*/}
      {/*---------------------------------------------- */}

      <div className="google">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      {/*---------------------------------------------- */}

      <Link to="/JobSeekerSignup">
        <p>Stil don't have a account?</p>
      </Link>
      {authentcating && <p>Authenticating.... please wait!</p>}
      <span>{userData.message}</span>

      {/*---------------------------------------------- */}
      {/* Redirect User to the ProfilePage after logged in */}
      {/* --------------------------------------------- */}

      {userData.isAuthenticated && (
        <Redirect
          to={{
            pathname: "/ProfilePage",
          }}
        />
      )}
    </div>
  );
}

export default JobSeekerLogin;

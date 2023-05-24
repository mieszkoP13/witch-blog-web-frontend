import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";
import PopUp from "../components/PopUp";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const RE_PASSWD = /^\S.{8,}$/;
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const RE_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    console.log(JSON.stringify(data));

    axios
      .post("https://witchblog.azurewebsites.net/api/v1/auth/signin", data)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        navigate("/users/profile");
      })
      .catch((err) => {
        setLoading(false);
        setShowPopUp(true);
      });
  };

  return (
    <>
      <div className="wrap-sign-in">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="sign-in-h1">Sign in!</h1>
              <div className="form-item">
                <h2>Email Address</h2>
                <input
                  {...register("email", {
                    required: true,
                    pattern: { value: RE_EMAIL },
                  })}
                />
                {errors.email ? (
                  <p className="error-txt">Invalid Email Address.</p>
                ) : (
                  <p className="invisible error-txt">Invalid Email Address.</p>
                )}
              </div>
              <div className="form-item">
                <h2>Password</h2>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: { value: RE_PASSWD },
                  })}
                />
                {errors.password ? (
                  <p className="error-txt">At least 8 chars, no spaces.</p>
                ) : (
                  <p className="invisible error-txt">
                    At least 8 chars, no spaces.
                  </p>
                )}
              </div>
              <button className="btn-sign-in" type="submit">
                Sign in
              </button>
            </form>
            <div className="login-ways-wrap">
              <GoogleLoginButton />
              <FacebookLoginButton />
            </div>
          </>
        )}
      </div>
      <PopUp show={showPopUp} setShow={setShowPopUp}>
        <h1 className="sign-in-err-h1">Sign up error</h1>
        <span>
          Given Email/Password are wrong or your Email Address haven't been
          confirmed.
        </span>
      </PopUp>
    </>
  );
};

export default SignIn;

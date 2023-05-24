import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/SignIn.css";
import { useNavigate } from "react-router-dom";

const RE_USER = /^\S{3,}$/;
const RE_PASSWD = /^\S.{8,}$/;
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const RE_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUp = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    delete data.password2;

    axios
      .post("https://witchblog.azurewebsites.net/api/v1/auth/signup", data)
      .then((res) => {
        setLoading(false);
        navigate("/SignIn");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <form className="wrap-sign-in" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item">
              <h2>First Name</h2>
              <input
                {...register("firstName", {
                  required: true,
                  pattern: { value: RE_USER },
                })}
              />
              {errors.firstName ? (
                <p className="error-txt">At least 3 chars, no spaces.</p>
              ) : (
                <p className="invisible error-txt">
                  At least 3 chars, no spaces.
                </p>
              )}
            </div>
            <div className="form-item">
              <h2>Last Name</h2>
              <input
                {...register("lastName", {
                  required: true,
                  pattern: { value: RE_USER },
                })}
              />
              {errors.lastName ? (
                <p className="error-txt">At least 3 chars, no spaces.</p>
              ) : (
                <p className="invisible error-txt">
                  At least 3 chars, no spaces.
                </p>
              )}
            </div>
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
            <div className="form-item">
              <h2>Repeat password</h2>
              <input
                type="password"
                {...register("password2", {
                  required: true,
                  validate: (val) => {
                    if (getValues("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              {errors.password2 ? (
                <p className="error-txt">Passwords doesn't match.</p>
              ) : (
                <p className="invisible error-txt">Passwords doesn't match.</p>
              )}
            </div>
            <button className="btn-sign-in" type="submit">
              Sign up
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default SignUp;

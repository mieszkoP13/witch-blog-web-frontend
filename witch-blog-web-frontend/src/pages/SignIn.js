import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
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
    getValues,
  } = useForm();

  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    
    axios
      .post("https://witchblog.azurewebsites.net/api/v1/auth/signin", data)
      .then((res) => {
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/users/profile")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrap-sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in!</h1>
        <div className="form-item">
          <h2>Email Address</h2>
          <input
            {...register("email", {
              required: true,
              pattern: { value: RE_EMAIL },
            })}
          />
          {errors.email && (
            <p className="error-txt">Niepoprawny adres e-mail</p>
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
          {errors.password && (
            <p className="error-txt">Wymagane min. 8 znaków, brak spacji</p>
          )}
        </div>
        <input className="send-btn" type="submit" />
      </form>
      <GoogleLoginButton />
    </div>
  );
};

export default SignIn;
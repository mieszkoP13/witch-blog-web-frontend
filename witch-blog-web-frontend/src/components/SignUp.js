import React from 'react'
import { useForm } from "react-hook-form"
import GoogleLoginButton from "./GoogleLoginButton";
import './SignUp.css'

const RE_USER = /^\S{3,}$/
const RE_PASSWD = /^\S.{8,}$/
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const RE_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = props => {
  const { register, formState: { errors }, handleSubmit, getValues } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <div className="wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up!</h1>
        <div className="form-item">
            <h2>Username</h2>
            <input
            {...register("username", {
              required: true,
              pattern: { value: RE_USER }
            })}
          />
          {errors.username && <p className="error-txt">Wymagane min. 3 znaki, brak spacji</p>}
        </div>
        <div className="form-item">
          <h2>Email Address</h2>
          <input 
            {...register("email", {
              required: true,
              pattern: { value: RE_EMAIL }
            })}
          />
          {errors.email && <p className="error-txt">Niepoprawny adres e-mail</p>}
        </div>
        <div className="form-item">
            <h2>Password</h2>
            <input type="password"
            {...register("passwd", {
              required: true,
              pattern: { value: RE_PASSWD }
            })}
          />
          {errors.passwd && <p className="error-txt">Wymagane min. 8 znaków, brak spacji</p>}
        </div>
        <div className="form-item">
            <h2>Repeat password</h2>
            <input type="password"
            {...register("passwd2", {
              required: true,
              validate: (val) => {
                if (getValues('passwd') !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.passwd2 && <p className="error-txt">Hasła do siebie nie pasują</p>}
        </div>
        <input className="send-btn" type="submit" />
        <GoogleLoginButton />
      </form>
    </div>
  )
}

export default SignUp
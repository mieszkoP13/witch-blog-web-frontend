import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import GoogleLoginButton from "../components/GoogleLoginButton"
import './SignUp.css'

const RE_USER = /^\S{3,}$/
const RE_PASSWD = /^\S.{8,}$/
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const RE_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = props => {
  const { register, formState: { errors }, handleSubmit, getValues } = useForm()
  const onSubmit = (data) => {
    delete data.password2
    console.log(JSON.stringify(data))
     axios
       .post('https://witchblog.azurewebsites.net/api/v1/auth/signup', data)
       .then((res) => {
         console.log(res)
       })
       .catch((err) => {
          console.log(err)
       })
  }

  return (
    <div className="wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up!</h1>
        <div className="form-item">
            <h2>First Name</h2>
            <input
            {...register("firstName", {
              required: true,
              pattern: { value: RE_USER }
            })}
          />
          {errors.firstName && <p className="error-txt">Wymagane min. 3 znaki, brak spacji</p>}
        </div>
        <div className="form-item">
            <h2>Last Name</h2>
            <input
            {...register("lastName", {
              required: true,
              pattern: { value: RE_USER }
            })}
          />
          {errors.lastName && <p className="error-txt">Wymagane min. 3 znaki, brak spacji</p>}
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
            {...register("password", {
              required: true,
              pattern: { value: RE_PASSWD }
            })}
          />
          {errors.password && <p className="error-txt">Wymagane min. 8 znaków, brak spacji</p>}
        </div>
        <div className="form-item">
            <h2>Repeat password</h2>
            <input type="password"
            {...register("password2", {
              required: true,
              validate: (val) => {
                if (getValues('password') !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.password2 && <p className="error-txt">Hasła do siebie nie pasują</p>}
        </div>
        <input className="send-btn" type="submit" />
        <GoogleLoginButton />
      </form>
    </div>
  )
}

export default SignUp
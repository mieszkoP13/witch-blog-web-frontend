import React from "react";
import "../styles/GoogleLoginButton.css";
import googleLogo from "../imgs/light/logo-google.svg";

function GoogleLoginButton() {
  return (
    <a href="https://witchblog.azurewebsites.net/oauth2/authorize/google?redirect-uri=http://localhost:3000/users/profile">
      <div className="button">
        <img className="google-logo" src={googleLogo} alt="google logo" />
        Sign in with Google
      </div>
    </a>
  );
}

export default GoogleLoginButton;

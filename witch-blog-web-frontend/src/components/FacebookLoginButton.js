import React from "react";
import "./FacebookLoginButton.css";

function GoogleLoginButton() {
  return (
    <a href="https://witchblog.azurewebsites.net/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/users/profile">
      <button className="btn-google">Sign in with Facebook </button>
    </a>
  );
}

export default GoogleLoginButton;

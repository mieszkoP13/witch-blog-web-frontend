import React from "react";
import "./FacebookLoginButton.css";

function FacebookLoginButton() {
  return (
    <a href="https://witchblog.azurewebsites.net/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/users/profile">
      <button className="btn-facebook">Sign in with Facebook </button>
    </a>
  );
}

export default FacebookLoginButton;

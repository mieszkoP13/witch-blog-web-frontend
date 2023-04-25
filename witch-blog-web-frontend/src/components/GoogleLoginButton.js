import React from "react";
import "./GoogleLoginButton.css";

function GoogleLoginButton() {
  return (
    <a href="https://witchblog.azurewebsites.net/oauth2/authorize/google?redirect_uri=http://localhost:3000/users/profile">
      <button className="btn-google">Sign in with Google </button>
    </a>
  );
}

export default GoogleLoginButton;

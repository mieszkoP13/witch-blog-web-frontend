import React from "react";

function GoogleLoginButton() {
  return (
    <a href="https://witchblog.azurewebsites.net/oauth2/authorize/google?redirect_uri=http://localhost:3000/users/profile">
      <button>Sign in with Google </button>
    </a>
  );
}

export default GoogleLoginButton;

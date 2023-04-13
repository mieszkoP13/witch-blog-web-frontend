import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleOAuthProvider clientId="429132861636-62lavmogejm6vklnr2cqfuf8phenco28.apps.googleusercontent.com">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </GoogleOAuthProvider>
    </div>
  );
}
export default GoogleLoginButton;

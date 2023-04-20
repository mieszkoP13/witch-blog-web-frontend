import { useEffect, useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getData = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        axios
          .get(`https://witchblog.azurewebsites.net/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    };
    getData();
  }, []);
  return (
    <div>
      {profile ? (
        <>
          <h3>User Logged in</h3>
          <p>Email: {profile.email}</p>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
        </>
      ) : (
        <GoogleLoginButton />
      )}
      ;
    </div>
  );
};

export default Profile;

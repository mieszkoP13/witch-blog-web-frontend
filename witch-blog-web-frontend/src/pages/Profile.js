import { useEffect, useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "./Profile.css";
import useLoginStatus from "../hooks/useLoginStatus";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const isLoggedIn = useLoginStatus();
  useEffect(() => {
    const getData = () => {
      if (!isLoggedIn) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("token");
        if (query) {
          localStorage.setItem("token", query);
          setToken(query);
        }
      }

      if (isLoggedIn) {
        axios
          .get(`https://witchblog.azurewebsites.net/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setProfile(res.data);
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    };
    getData();
  }, [token, isLoggedIn]);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/users/profile";
  };

  return (
    <div className="wrap-profile">
      {profile ? (
        <>
          <h3>User Logged in</h3>
          <p>Email: {profile.email}</p>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <button onClick={logOut}>Log out</button>
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default Profile;

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
          <div className="left-panel"></div>
          <div className="right-panel">
            <h1 className="profile-h1">Profile information and settings</h1>
            <div className="profile-it">
              <span className="profile-it-txt">Email</span>
              <span className="profile-it-txt">{profile.email}</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">First Name</span>
              <span className="profile-it-txt">{profile.firstName}</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Last Name</span>
              <span className="profile-it-txt">{profile.lastName}</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Date of Birth</span>
              <span className="profile-it-txt">...</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Time of Birth</span>
              <span className="profile-it-txt">...</span>
            </div>
            <button className="btn-log-out" onClick={logOut}>Log out</button>
          </div>
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default Profile;
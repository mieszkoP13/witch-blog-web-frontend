import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import useLoginStatus from "../hooks/useLoginStatus";
import EditPopUp from "../components/EditPopUp";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const isLoggedIn = useLoginStatus();
  const [showPopUpEmail, setShowPopUpEmail] = useState(false);
  const [showPopUpFirstName, setShowPopUpFirstName] = useState(false);
  const [showPopUpLastName, setShowPopUpLastName] = useState(false);

  useEffect(() => {
    const getData = () => {
      if (!isLoggedIn) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("token");
        if (query) {
          params.delete("token");
          localStorage.setItem("token", query);
          setToken(query);
          window.history.pushState(
            {},
            "",
            "http://localhost:3000/users/profile"
          );
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
              <span id="email-field" className="profile-it-txt">
                {profile.email}
              </span>
              {showPopUpEmail ? (
                <EditPopUp
                  setShow={setShowPopUpEmail}
                  dataToEdit="email"
                  email={profile.email}
                />
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setShowPopUpEmail(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">First Name</span>
              <span id="firstName-field" className="profile-it-txt">
                {profile.firstName}
              </span>
              {showPopUpFirstName ? (
                <EditPopUp
                  setShow={setShowPopUpFirstName}
                  dataToEdit="firstName"
                  email={profile.email}
                />
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setShowPopUpFirstName(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Last Name</span>
              <span id="lastName-field" className="profile-it-txt">
                {profile.lastName}
              </span>
              {showPopUpLastName ? (
                <EditPopUp
                  setShow={setShowPopUpLastName}
                  dataToEdit="lastName"
                  email={profile.email}
                />
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setShowPopUpLastName(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Date of Birth</span>
              <span className="profile-it-txt">...</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Time of Birth</span>
              <span className="profile-it-txt">...</span>
            </div>
            <button className="btn-log-out" onClick={logOut}>
              Log out
            </button>
          </div>
        </>
      ) : (
        <span>You've been logged out successfully</span>
      )}
    </div>
  );
};

export default Profile;

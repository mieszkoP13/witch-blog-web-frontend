import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTokenStatus from "../hooks/useTokenStatus";
import GoogleLoginButton from "../components/GoogleLoginButton";
import EditPopUp from "../components/EditPopUp";
import DeleteProfileButton from "../components/DeleteProfileButton";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const isToken = useTokenStatus();
  const [showPopUpFirstName, setShowPopUpFirstName] = useState(false);
  const [showPopUpLastName, setShowPopUpLastName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      if (!isToken) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("token");
        if (query) {
          params.delete("token");
          localStorage.setItem("token", query);
          setToken(query);
          navigate("/users/profile");
        }
      }

      if (isToken) {
        axios
          .get(`https://witchblog.azurewebsites.net/api/v1/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => {
            localStorage.removeItem("token");
            console.log(err);
          });
      }
    };
    getData();
    return () => {
      setProfile(null);
    };
  }, [token, isToken, navigate]);

  const logOut = () => {
    localStorage.removeItem("token");
    setProfile(null);
    window.location.reload();
  };

  return (
    <>
      {profile ? (
        <div className="profile-wrapper">
          <div className="left-panel"></div>
          <div className="right-panel">
            <div className="profile-it">
              <span className="profile-it-txt">Email:</span>
              <span id="email-field" className="profile-it-txt">
                {profile.email}
              </span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">First Name:</span>
              {showPopUpFirstName ? (
                <EditPopUp
                  setShow={setShowPopUpFirstName}
                  dataToEdit="firstName"
                  email={profile.email}
                  dataValue={profile.firstName}
                />
              ) : (
                <div className="edit-wrap">
                  <span id="firstName-field" className="profile-it-txt">
                    {profile.firstName}
                  </span>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setShowPopUpFirstName(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square fa-xl fa-sharp"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Last Name:</span>
              {showPopUpLastName ? (
                <EditPopUp
                  setShow={setShowPopUpLastName}
                  dataToEdit="lastName"
                  email={profile.email}
                  dataValue={profile.lastName}
                />
              ) : (
                <div className="edit-wrap">
                  <span id="lastName-field" className="profile-it-txt">
                    {profile.lastName}
                  </span>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setShowPopUpLastName(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square fa-xl fa-sharp"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Date of Birth:</span>
              <span className="profile-it-txt">...</span>
            </div>
            <div className="profile-it">
              <span className="profile-it-txt">Time of Birth:</span>
              <span className="profile-it-txt">...</span>
            </div>
            <div className="profile-it">
              <button className="button-small" onClick={logOut}>
                Log out
              </button>
              <DeleteProfileButton email={profile.email} />
            </div>
          </div>
        </div>
      ) : (
        <div className="login-wrapper">
          <Link className="button" to="/SignIn">
            Sign In
          </Link>
          <Link className="button" to="/SignUp">
            Sign up
          </Link>
          <GoogleLoginButton />
        </div>
      )}
    </>
  );
};

export default Profile;

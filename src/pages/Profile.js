import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTokenStatus from "../hooks/useTokenStatus";
import GoogleLoginButton from "../components/GoogleLoginButton";
import EditPopUp from "../components/EditPopUp";
import DeleteProfileButton from "../components/DeleteProfileButton";
import axios from "axios";
import "../styles/Profile.css";
import aquarius from "../imgs/light/zodiac/aquarius.png";
import aries from "../imgs/light/zodiac/aries.png";
import cancer from "../imgs/light/zodiac/cancer.png";
import capricorn from "../imgs/light/zodiac/capricorn.png";
import gemini from "../imgs/light/zodiac/gemini.png";
import leo from "../imgs/light/zodiac/leo.png";
import libra from "../imgs/light/zodiac/libra.png";
import pisces from "../imgs/light/zodiac/pisces.png";
import sagittarius from "../imgs/light/zodiac/sagittarius.png";
import scorpio from "../imgs/light/zodiac/scorpio.png";
import taurus from "../imgs/light/zodiac/taurus.png";
import virgo from "../imgs/light/zodiac/virgo.png";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const isToken = useTokenStatus();
  const [showPopUpFirstName, setShowPopUpFirstName] = useState(false);
  const [showPopUpLastName, setShowPopUpLastName] = useState(false);
  const [showPopUpDate, setShowPopUpDate] = useState(false);
  const [zodiac, setZodiac] = useState(null);
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
            const date = new Date(res.data.birthDate);
            console.log(date);
            const stringDate = date.toLocaleString("pl-PL", {
              timeZone: "UTC",
            });
            console.log(date.getHours());
            setZodiac(findZodiac(date));
            res.data.birthDate = stringDate;
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

  const findZodiac = (date) => {
    const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
    const signs = [
      aquarius,
      pisces,
      aries,
      taurus,
      gemini,
      cancer,
      leo,
      virgo,
      libra,
      scorpio,
      sagittarius,
      capricorn,
    ];
    let month = date.getMonth();
    let day = date.getDate();
    if (month === 0 && day <= 20) {
      month = 11;
    } else if (day < days[month]) {
      month--;
    }
    // return "../imgs/light/zodiac/" + signs[month] + ".png";
    return signs[month];
  };

  const handleClick = () => {
    navigate("/Horoscopes");
  };

  return (
    <>
      {profile ? (
        <div className="profile-wrapper">
          <img
            onClick={handleClick}
            src={zodiac}
            className="left-panel"
            alt="zodiac"
          />
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
              {showPopUpDate ? (
                <EditPopUp
                  setShow={setShowPopUpDate}
                  dataToEdit="birthDate"
                  email={profile.email}
                  dataValue={profile.birthDate}
                />
              ) : (
                <div className="edit_wrap">
                  <span id="birthDate-field" className="profile-it-txt">
                    {profile.birthDate}
                  </span>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setShowPopUpDate(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square fa-xl fa-sharp"></i>
                  </button>
                </div>
              )}
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

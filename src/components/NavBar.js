import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import facebookLogoLight from "../imgs/light/facebook_logo.png";
import androidLogoLight from "../imgs/light/android.png";

const NavBar = () => {
  const [bottomActive, setBottomActive] = useState(false);
  const [topActive, setTopActive] = useState(false);
  const navigate = useNavigate();

  const toggleActive = () => {
    setBottomActive((current) => !current);
  };

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className="nav-link top-left" to="/Articles">
              Articles
            </Link>
          </li>
          <li>
            <Link className="nav-link top-right" to="/users/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={
                bottomActive
                  ? "nav-link bottom-left open-socials"
                  : "nav-link bottom-left"
              }
              to="/Horoscopes"
            >
              Horoscopes
            </Link>
          </li>
          <li>
            <Link
              className={
                bottomActive
                  ? "nav-link bottom-right open-socials"
                  : "nav-link bottom-right"
              }
              to="/Divinations/Classic"
            >
              Divinations
            </Link>
          </li>
          <li>
            <div
              onClick={handleClick}
              onTouchStart={() => setTopActive(true)}
              onTouchEnd={() => setTopActive(false)}
              onMouseEnter={() => setTopActive(true)}
              onMouseLeave={() => setTopActive(false)}
              className={
                topActive
                  ? "cards-div nav-link top-center active"
                  : "cards-div nav-link top-center"
              }
            >
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </li>
          <li>
            <div
              onClick={toggleActive}
              className={
                bottomActive
                  ? "plus nav-link bottom-center active open-socials"
                  : "plus nav-link bottom-center"
              }
            >
              <span className="plus-bar plus-bar-top"></span>
              <span className="plus-bar plus-bar-bottom"></span>
            </div>
          </li>
        </ul>
      </nav>
      <div className={bottomActive ? "socials open-socials" : "socials"}>
        <a
          className="social-link"
          href="https://www.facebook.com/profile.php?id=100091842926056"
        >
          <img
            src={facebookLogoLight}
            alt="facebook logo"
            className="logo"
            width="50"
            height="50"
          />
        </a>
        <a className="social-link" href=".">
          <img
            src={androidLogoLight}
            alt="android logo"
            className="logo"
            width="35"
            height="35"
          />
        </a>
      </div>
    </>
  );
};

export default NavBar;

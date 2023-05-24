import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import facebookLogoLight from "../imgs/light/facebook_logo.png";

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
            <Link className="nav_link top_left" to="/Articles">
              Articles
            </Link>
          </li>
          <li>
            <Link className="nav_link top_right" to="/users/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={
                bottomActive
                  ? "nav_link bottom_left open_socials"
                  : "nav_link bottom_left"
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
                  ? "nav_link bottom_right open_socials"
                  : "nav_link bottom_right"
              }
              to="/Divinations"
            >
              Divinations
            </Link>
          </li>
          <li>
            <div
              onClick={handleClick}
              onMouseEnter={() => setTopActive(true)}
              onMouseLeave={() => setTopActive(false)}
              className={
                topActive
                  ? "cards_div nav_link top_center active"
                  : "cards_div nav_link top_center"
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
                  ? "plus nav_link bottom_center active open_socials"
                  : "plus nav_link bottom_center"
              }
            >
              <span className="plus_bar plus_bar_top"></span>
              <span className="plus_bar plus_bar_bottom"></span>
            </div>
          </li>
        </ul>
      </nav>
      <div className={bottomActive ? "socials open_socials" : "socials"}>
        <a
          className="social_link"
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
      </div>
    </>
  );
};

export default NavBar;

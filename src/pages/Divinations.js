import React from "react";
import { Link } from "react-router-dom";
import "../styles/Divinations.css";

const Divinations = () => {
  return (
    <div className="divinations-wrapper">
      <Link to="/Divinations/Classic" className="div-button">
        Classic 3-card Tarot Reading
      </Link>
      <Link to="/Divinations/Love" className="div-button">
        Love Tarot Reading
      </Link>
      <Link to="/Divinations/Birth" className="div-button">
        Birth Chart Tarot Reading
      </Link>
    </div>
  );
};

export default Divinations;

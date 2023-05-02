import React from "react";
import { Link } from 'react-router-dom'
import "./Divinations.css";

const Divinations = (props) => {

  return (
    <div className="wrap-divinations">
        <h1 className="divinations-h1">Select which type of Tarot Reading <br/> would you like to receive</h1>
        <Link to="/Divinations/Classic" className="btn-divin">
          <span className="btn-divin-txt">Classic 3-card Tarot Reading</span>
        </Link>
        <Link to="/Divinations/Love" className="btn-divin">
          <span className="btn-divin-txt">Love Tarot Reading</span>
        </Link>
        <Link to="/Divinations/Birth" className="btn-divin">
          <span className="btn-divin-txt">Birth Chart Tarot Reading</span>
        </Link>
    </div>
  );
};

export default Divinations;
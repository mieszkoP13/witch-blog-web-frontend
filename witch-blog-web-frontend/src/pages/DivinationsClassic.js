import React from "react";
import "./DivinationsClassic.css";
import Card from "../components/Card";

const DivinationsClassic = (props) => {

  return (
    <div className="wrap-divinC">
          <div className="top-panel">
            <h1 className="divinC-h1">Tarot Reading</h1>
            <h2 className="divinC-h2">Get the answers with 3-card Tarot spread <br/> by tapping each card.</h2>
          </div>
          <div className="bottom-panel">
            <Card/>
            <Card/>
            <Card/>
          </div>
    </div>  
  );
};

export default DivinationsClassic;
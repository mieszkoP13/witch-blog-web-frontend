import React from "react";
import "../styles/PopUp.css";
import { useNavigate } from "react-router-dom";

const PopUp = (props) => {
  const navigate = useNavigate();
  const customFunction = () => {
    if (props.customFunction) {
      props.customFunction();
    }
    props.setShow(false);
  };

  return (
    <div className={"popup"}>
      {props.children}
      <div className="button-div">
        <button className="popup-button" onClick={customFunction}>
          Ok
        </button>
        <button
          className="popup-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUp;

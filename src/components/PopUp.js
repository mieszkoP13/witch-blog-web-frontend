import React from "react";
import "../styles/PopUp.css";

const PopUp = ({children, setShow, customFunction, customFunctionBtnText, defaultBtnText}) => {

  return (
    <div className={"popup"}>
      {children}
      <div className="button-div">
        {customFunction ? (
          <button className="popup-button" onClick={() => { customFunction(); setShow(false); }}>
            {customFunctionBtnText}
          </button> ) : (<></>)
        }
        <button className="popup-button" onClick={() => setShow(false)}>
          {defaultBtnText}
        </button>
      </div>
    </div>
  );
};

export default PopUp;

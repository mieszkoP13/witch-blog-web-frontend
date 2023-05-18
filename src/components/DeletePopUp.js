import React from "react";
import "./PopUp.css";

const DeletePopUp = (props) => {
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
        <button className="btn-popup" onClick={customFunction}>
          Ok
        </button>
        <button className="btn-popup" onClick={() => props.setShow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;

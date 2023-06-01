import React, { useState } from "react";
import axios from "axios";
import "../styles/DeleteProfileButton.css";
import PopUp from "./PopUp";

const DeleteProfileButton = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const deleteProfile = () => {
    axios
      .delete(
        `https://witchblog.azurewebsites.net/api/v1/users/${props.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000";
      });
  };
  return (
    <>
      {showPopUp ? (
        <>
          <button
            className="button-small"
            onClick={() => {
              setShowPopUp(true);
            }}
          >
            Delete Account
          </button>
          <PopUp setShow={setShowPopUp} customFunction={deleteProfile} customFunctionBtnText="Delete" defaultBtnText="Cancel">
            <h1 className="sign-in-err-h1">
              Are you sure you want to delete your account?
            </h1>
            <span>This action is irreversible</span>
          </PopUp>
        </>
      ) : (
        <button
          className="button-small"
          onClick={() => {
            setShowPopUp(true);
          }}
        >
          Delete Account
        </button>
      )}
    </>
  );
};

export default DeleteProfileButton;

import React, { useState } from "react";
import axios from "axios";
import "../styles/DeleteProfileButton.css";
import DeletePopUp from "./DeletePopUp";

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
          <DeletePopUp setShow={setShowPopUp} customFunction={deleteProfile}>
            <h1 className="sign-in-err-h1">
              Are you sure you want to delete your account?
            </h1>
            <span>This action is irreversible</span>
          </DeletePopUp>
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

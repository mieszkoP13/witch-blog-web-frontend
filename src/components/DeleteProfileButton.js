import React from "react";
import axios from "axios";

const DeleteProfileButton = (props) => {
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
    <button className="delete-profile-btn" onClick={deleteProfile}>
      Delete Account
    </button>
  );
};

export default DeleteProfileButton;

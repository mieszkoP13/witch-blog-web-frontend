import axios from "axios";
import "../styles/EditPopUp.css";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const EditPopUp = (props) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const edit = () => {
    props.setShow(false);
    const data = { [props.dataToEdit]: input };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .put(
        `https://witchblog.azurewebsites.net/api/v1/users/${props.email}`,
        data,
        config
      )
      .then(() => {
        const field = document.querySelector("#" + props.dataToEdit + "-field");
        field.textContent = input;
      });
  };

  return (
    <div className="edit-popup">
      <input
        className="input-edit-popup"
        type="text"
        defaultValue={props.dataValue}
        onChange={handleInputChange}
      ></input>
      <button className="btn-edit-popup btn-yes" onClick={edit}>
        <i className="fa-solid fa-check fa-xl"></i>
      </button>
      <button
        className="btn-edit-popup btn-x"
        onClick={() => props.setShow(false)}
      >
        <i className="fa-solid fa-x fa-xl"></i>
      </button>
    </div>
  );
};

export default EditPopUp;

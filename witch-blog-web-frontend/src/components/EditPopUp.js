import axios from "axios";
import "./EditPopUp.css";
import React, { useState } from "react";

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
    <div className={"edit-popup"}>
      Edit {props.dataToEdit}:
      <input
        className="input-edit-popup"
        type="text"
        onChange={handleInputChange}
      ></input>
      <button className="btn-edit-popup" onClick={edit}>
        Ok
      </button>
    </div>
  );
};

export default EditPopUp;

import React, { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Divinations");
  };
  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className={active ? "center active" : "center"}
      ></div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import back from "../imgs/light/back.png";
import "../styles/Card.css";

const Card = ({ base64, updateFlip, id }) => {
  const [flip, setFlip] = useState(false);

  const flipOnce = () => setFlip(true);

  useEffect(() => {
    updateFlip(flip, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip]);

  return (
    <img
      onClick={flipOnce}
      className="tarot-card"
      src={flip ? `data:image/jpeg;base64,${base64}` : back}
      alt="Card"
    />
  );
};

export default Card;

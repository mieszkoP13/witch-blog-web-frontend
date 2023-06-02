import React, { useEffect, useState } from "react";
import back from "../imgs/light/back.png";
import "../styles/Card.css";

const Card = ({ base64, reversed, updateFlip, id }) => {
  const [flip, setFlip] = useState(false);

  const flipOnce = () => setFlip(true);

  useEffect(() => {
    updateFlip(flip, id);
  }, [flip]);

  useEffect(()=>{console.log(reversed)},[])

  return (
    <div className={flip ? "flip flip-container" : "flip-container"}>
      <img
        onClick={flipOnce}
        className="tarot-card front"
        src={back}
        alt="Card"
      />
      <img
        onClick={flipOnce}
        className={reversed ? "img-vert tarot-card back" : "tarot-card back"}
        src={`data:image/jpeg;base64,${base64}`}
        alt="Card"
      />
    </div>
  );
};

export default Card;

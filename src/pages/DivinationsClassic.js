import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/DivinationsClassic.css";
import Card from "../components/Card";
import PopUp from "../components/PopUp";

const DivinationsClassic = (props) => {
  const [active, setActive] = useState(false);
  const effectRan = useRef(false);
  const [cards] = useState([
    { name: "", fortune_telling: [], base64: "", isFlipped: false },
    { name: "", fortune_telling: [], base64: "", isFlipped: false },
    { name: "", fortune_telling: [], base64: "", isFlipped: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);

  const updateFlip = (_flip, _id) => {
    _flip && Object.assign(cards[_id], { isFlipped: true });

    setAllCardsFlipped(cards.every((card) => card.isFlipped === true));
  };

  useEffect(() => {
    // prevents fetching data twice with strict mode
    if (effectRan.current === false) {
      setLoading(true);
      axios
        .get(
          `https://witchblog.azurewebsites.net/api/v1/tarot/random?numOfCards=3`
        )
        .then((res) => {
          for (let i = 0; i < 3; ++i) {
            Object.assign(cards[i], { name: res.data[i].name });
            Object.assign(cards[i], {
              fortune_telling: res.data[i].fortune_telling,
            });
          }

          return axios.post(
            `https://witchblog.azurewebsites.net/api/v1/images/base64/tarot/name`,
            [cards[0].name, cards[1].name, cards[2].name]
          );
        })
        .then((res) => {
          for (let i = 0; i < 3; ++i) {
            Object.assign(cards[i], { base64: res.data[i] });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="divinationsC-wrapper">
      {loading ? (
        <div className="divinationsC-loading-wrapper">
          <div className="divinationsC-loading-spin"></div>
          <div className="divinationsC-loading-text">Consulting Ezoteriusz</div>
        </div>
      ) : (
        <>
          <div
            onMouseEnter={() => setActive(true)}
            className={active ? "cards-wrapper active" : "cards-wrapper"}
          >
            <div className="card-container">
              <Card base64={cards[0].base64} updateFlip={updateFlip} id={0} />
            </div>
            <div className="card-container">
              <Card base64={cards[1].base64} updateFlip={updateFlip} id={1} />
            </div>
            <div className="card-container">
              <Card base64={cards[2].base64} updateFlip={updateFlip} id={2} />
            </div>
          </div>
          <button
            onClick={() => allCardsFlipped && setReveal(true)}
            className="button-divinC"
            type="submit"
          >
            Channel the medium
          </button>
        </>
      )}

      {reveal ? (
        <PopUp setShow={setReveal} defaultBtnText="Ok">
          <h2 className="meaning-h2">{cards[0].fortune_telling[0]}</h2>
          <h2 className="meaning-h2">{cards[1].fortune_telling[0]}</h2>
          <h2 className="meaning-h2">{cards[2].fortune_telling[0]}</h2>
        </PopUp>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DivinationsClassic;

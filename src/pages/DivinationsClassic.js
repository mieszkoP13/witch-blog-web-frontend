import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/DivinationsClassic.css";
import Card from "../components/Card";
import PopUp from "../components/PopUp";
import useTokenStatus from "../hooks/useTokenStatus";
import { useNavigate } from "react-router-dom";

const DivinationsClassic = (props) => {
  const [active, setActive] = useState(false);
  const isToken = useTokenStatus();
  const effectRan = useRef(false);
  const [cards] = useState([
    { name: "", base64: "", reversed: false, isFlipped: false },
    { name: "", base64: "", reversed: false, isFlipped: false },
    { name: "", base64: "", reversed: false, isFlipped: false },
  ]);
  const [fortune, setFortune] = useState("");
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);
  const [logReveal, setLogReveal] = useState(true);
  const navigate = useNavigate();

  const updateFlip = (_flip, _id) => {
    _flip && Object.assign(cards[_id], { isFlipped: true });

    setAllCardsFlipped(cards.every((card) => card.isFlipped === true));
  };

  useEffect(() => {
    // prevents fetching data twice with strict mode
    if (effectRan.current === false) {
      setLoading(true);
      axios
        .post(
          `https://witchblog.azurewebsites.net/api/v1/divination`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setFortune(res.data.prediction);
          for (let i = 0; i < 3; ++i) {
            Object.assign(cards[i], {
              name: res.data.cardsResponse[i].card.name,
            });
            Object.assign(cards[i], {
              reversed: res.data.cardsResponse[i].reversed,
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
    <>
      {isToken ? (
        <div className="divinations-wrapper">
          {loading ? (
            <div className="loading-wrapper">
              <div className="loading-spin"></div>
              <div className="loading-text">Consulting Ezoteriusz</div>
            </div>
          ) : (
            <>
              <div
                onMouseEnter={() => setActive(true)}
                className={active ? "cards-wrapper active" : "cards-wrapper"}
              >
                <div className="card-container">
                  <Card
                    base64={cards[0].base64}
                    reversed={cards[0].reversed}
                    updateFlip={updateFlip}
                    id={0}
                  />
                </div>
                <div className="card-container">
                  <Card
                    base64={cards[1].base64}
                    reversed={cards[1].reversed}
                    updateFlip={updateFlip}
                    id={1}
                  />
                </div>
                <div className="card-container">
                  <Card
                    base64={cards[2].base64}
                    reversed={cards[2].reversed}
                    updateFlip={updateFlip}
                    id={2}
                  />
                </div>
              </div>
              <button
                onClick={() => allCardsFlipped && setReveal(true)}
                className="button divination-button"
                type="submit"
              >
                Channel the medium
              </button>
            </>
          )}

          {reveal ? (
            <PopUp setShow={setReveal}>
              <h2 className="meaning-h2">{fortune}</h2>
            </PopUp>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          {logReveal ? (
            <PopUp
              setShow={setLogReveal}
              customFunction={() => navigate("/users/profile")}
            >
              <h2 className="meaning-h2">
                You need to be logged in to access this page
              </h2>
            </PopUp>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default DivinationsClassic;

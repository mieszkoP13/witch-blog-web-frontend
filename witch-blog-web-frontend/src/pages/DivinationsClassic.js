import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DivinationsClassic.css";
import Card from "../components/Card";

const DivinationsClassic = (props) => {

  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://witchblog.azurewebsites.net/api/v1/tarot/random?numOfCards=3`)
      .then((res) => {

        let cardNames = []
        res.data.forEach(card => {
          cards.push({name: card.name, fortune_telling: card.fortune_telling})
          cardNames.push(card.name)
        })
        
        return axios.post(`https://witchblog.azurewebsites.net/api/v1/images/base64/tarot/name`,cardNames)
      })
      .then((res) => {
        for (let i = 0; i < 3; ++i) {
          console.log(res.data[i])
          Object.assign(cards[i], {base64: res.data[i]});
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  },[])

  return (
        <div className="wrap-divinC">
        {loading ? 
        ( <div className="loader-container">
            <div className="spinner"></div>
          </div> ) : 
        ( 
          <>
            <div className="top-panel">
              <h1 className="divinC-h1">Tarot Reading</h1>
              <h2 className="divinC-h2">Get the answers with 3-card Tarot spread <br/> by tapping each card.</h2>
            </div>
            <div className="bottom-panel">
              <Card base64={loading ? '' : cards[0].base64}/>
              <Card base64={loading ? '' : cards[1].base64}/>
              <Card base64={loading ? '' : cards[2].base64}/>
            </div>
          </>
        )}
        </div>
  );
};

export default DivinationsClassic;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./DivinationsClassic.css";
import Card from "../components/Card";

const DivinationsClassic = (props) => {

  const effectRan = useRef(false)
  const [cards] = useState([{name:"",fortune_telling:[],base64:"",isFlipped:false},{name:"",fortune_telling:[],base64:"",isFlipped:false},{name:"",fortune_telling:[],base64:"",isFlipped:false}])
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false)
  const [allCardsFlipped,setAllCardsFlipped] = useState(false)

  const updateFlip = (_flip, _id) => {
    _flip && Object.assign(cards[_id], {isFlipped: true});

    setAllCardsFlipped( cards.every( card => card.isFlipped === true ) )
  };

  useEffect(() => {

    // prevents fetching data twice with strict mode
    if( effectRan.current === false ) {
      setLoading(true);
      axios
        .get(`https://witchblog.azurewebsites.net/api/v1/tarot/random?numOfCards=3`)
        .then((res) => {

          for (let i = 0; i < 3; ++i) {
            Object.assign(cards[i], {name: res.data[i].name});
            Object.assign(cards[i], {fortune_telling: res.data[i].fortune_telling});
          }
          
          return axios.post(`https://witchblog.azurewebsites.net/api/v1/images/base64/tarot/name`,[cards[0].name, cards[1].name, cards[2].name])
        })
        .then((res) => {
          for (let i = 0; i < 3; ++i) {
            Object.assign(cards[i], {base64: res.data[i]});
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    return () => effectRan.current = true
  },[])

  return (
    <>
      <div className="wrap-divinC">
        <div className="box-divinC">
        {loading ? 
        ( <div className="loader-divinC">
            <div className="spinner-divinC"></div>
          </div> ) : 
        ( 
          <>
            <div className="top-panel">
              <h1 className="divinC-h1">Tarot Reading</h1>
              <h2 className="divinC-h2">Get the answers with 3-card Tarot spread <br/> by tapping each card.</h2>
            </div>
            <div className="bottom-panel">
              <div className="card-div">
                <Card base64={loading ? '' : cards[0].base64} updateFlip={updateFlip} id={0}/>
              </div>
              <div className="card-div">
                <Card base64={loading ? '' : cards[1].base64} updateFlip={updateFlip} id={1}/>
              </div>
              <div className="card-div">
                <Card base64={loading ? '' : cards[2].base64} updateFlip={updateFlip} id={2}/>
              </div>
            </div>
          </>
        )}
        </div>
        <button onClick={() => allCardsFlipped && setReveal(true)} className="btn-divinC" type="submit">Reveal the meaning</button>
        {reveal ? 
        (
        <div className="meaning">
          <h1 className="meaning-h1">These are your results:</h1>
          <h2 className="meaning-h2">{cards[0].fortune_telling[0]}</h2>
          <h2 className="meaning-h2">{cards[1].fortune_telling[0]}</h2>
          <h2 className="meaning-h2">{cards[2].fortune_telling[0]}</h2>
        </div>) : (<></>)}
      </div>
      
    </>
  );
};

export default DivinationsClassic;
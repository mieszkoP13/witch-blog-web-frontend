import React, { useState } from 'react'
import Back from './Back.svg';
import Cesarzowa from './Cesarzowa.jpg';
import "./Card.css"

const Card = props => {
  const [flip,setFlip] = useState(false)

  const flipOnce = () => setFlip(true)

  return (
    <div onClick={flipOnce} className="card-div">
        <img className="card" src={flip ? Cesarzowa : Back} alt="Card" />
    </div>
  )
}

export default Card
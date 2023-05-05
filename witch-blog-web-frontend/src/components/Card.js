import React, { useEffect, useState } from 'react'
import Back from './Back.svg';
import "./Card.css"

const Card = ({base64,updateFlip,id}) => {
  const [flip,setFlip] = useState(false)

  const flipOnce = () => setFlip(true)

  useEffect(() => {
    updateFlip(flip,id)
  }, [flip])

  return (
    <div onClick={flipOnce} className="card-div">
      <img className="card" src={flip ? `data:image/jpeg;base64,${base64}` : Back} alt="Card" />
    </div>
  )
}

export default Card
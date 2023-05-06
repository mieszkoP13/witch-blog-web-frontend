import React, { useEffect } from 'react'
import "./PopUp.css"

const PopUp = props => {

  useEffect(() => {
        const clickOutside = (e) => {
            if (!document.querySelector('.popup').contains(e.target))
                props.setShow(false)
        }
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, [props])


  return (
    <div className={`popup ${props.show ? null : "hide"}`}>
      {props.children}
      <button className="btn-popup" onClick={() => props.setShow(false)}>Ok</button>
    </div>
  )
}

export default PopUp
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import useLoginStatus from "../hooks/useLoginStatus";

const NavBar = props => {
  const [isActive, setActive] = useState(false)
  let isLoggedIn = useLoginStatus();

  useEffect(() => {
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if(e.matches && isActive)
        setActive(false)
    })
  })

  const toggleBurger = () => {
    setActive(!isActive)
  }

  return (
    <div className="wrapper">
      <button className="burger" onClick={toggleBurger}>
        <i className={`fas ${isActive ? "fa-times" : "fa-bars"}`}></i>
      </button>
      <nav>
        <ul className={isActive ? "active" : null}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Articles</Link></li>
            <li><Link to="/">Divinations</Link></li>
            <li><Link to="/">Horoscopes</Link></li>
            <li className={isLoggedIn ? "hide" : null}><Link to="/SignUp">Sign up</Link></li>
            <li className={isLoggedIn ? "hide" : null}><Link to="/SignIn">Sign in</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
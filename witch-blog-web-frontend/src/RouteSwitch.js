import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/users/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

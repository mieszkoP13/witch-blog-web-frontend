import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Articles from "./pages/Articles";
import Horoscopes from "./pages/Horoscopes";
import Divinations from "./pages/Divinations";
import DivinationsClassic from "./pages/DivinationsClassic";
import DivinationsLove from "./pages/DivinationsLove";
import DivinationsBirth from "./pages/DivinationsBirth";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Horoscopes" element={<Horoscopes />} />
        <Route path="/Divinations" element={<Divinations />} />
        <Route path="/Divinations/Classic" element={<DivinationsClassic />} />
        <Route path="/Divinations/Love" element={<DivinationsLove />} />
        <Route path="/Divinations/Birth" element={<DivinationsBirth />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/users/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

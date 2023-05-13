import React, { useEffect } from "react";
import axios from "axios";
import "./Horoscopes.css";

const Horoscopes = (props) => {

    useEffect(() => {
        axios
        .get("https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=6")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    },[])

    return (
        <>
        </>
    );
};

export default Horoscopes;
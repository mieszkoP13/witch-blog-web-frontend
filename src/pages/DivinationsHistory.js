import React, { useEffect, useState } from "react";
import "../styles/DivinationsHistory.css";
import PopUp from "../components/PopUp";
import useTokenStatus from "../hooks/useTokenStatus";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import History from "../components/History";

const DivinationsHistory = () => {
  const isToken = useTokenStatus();
  const [logReveal, setLogReveal] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .get(`https://witchblog.azurewebsites.net/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const userId = res.data.id;
          axios
            .get(
              `https://witchblog.azurewebsites.net/api/v1/history/${userId}?pageSize=1000`,
              config
            )
            .then((res) => {
              setLoading(false);
              //console.log(res.data.content);
              setHistory(res.data.content.reverse());
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          console.log(err);
          setLoading(false);
        });
    };
    const importAll = (r) => {
      // let imgs = {};
      // return r.keys().map((item, index) => {
      //   images[item.replace("./", "")] = r(item);
      // });
      // return imgs;
      return r.keys().map(r);
    };
    const imgs = importAll(
      require.context("../imgs/cards", false, /\.(png|jpe?g|svg)$/)
    );
    setImages(imgs);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isToken ? (
        <div className="divinations-wrapper scrollable">
          {loading ? (
            <div className="loading-wrapper history-wrapper">
              <div className="loading-spin"></div>
              <div className="loading-text">Reading Books of History</div>
            </div>
          ) : (
            <>
              <History history={history} images={images} />
            </>
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

export default DivinationsHistory;

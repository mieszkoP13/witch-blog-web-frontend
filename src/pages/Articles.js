import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useTokenStatus from "../hooks/useTokenStatus";
import useUserRoleStatus from "../hooks/useUserRoleStatus";
import DeletePopUp from "../components/PopUp";
import AddArticle from "../components/AddArticle";
import EditArticle from "../components/EditArticle";
import "../styles/Articles.css";

const Articles = () => {
  const { pageNo = 0 } = useParams()
  const [pageCount, setPageCount] = useState(1)

  const [loading, setLoading] = useState(true);

  const isToken = useTokenStatus();
  let isUserModerator = useUserRoleStatus("ROLE_MODERATOR")

  const [article, setArticle] = useState({})
  const [addArticle, setAddArticle] = useState(false)
  const [editArticle, setEditArticle] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("")

  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://witchblog.azurewebsites.net/api/v1/articles")
      .then((res) => {
        setPageCount(res.data.numberOfElements)
        setLoading(false);
      })
      .catch((err) => setLoading(false));

    axios
      .get(`https://witchblog.azurewebsites.net/api/v1/articles?pageSize=1&pageNo=${pageNo}`)
      .then((res) => {
        setArticle(res.data.content[0])
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  },[isToken,pageNo,editArticle,addArticle,showPopUp,showPopUpDelete])

  const updatePopUpMessage = (popUpMsg) => {
    setPopUpMessage(popUpMsg)
    setShowPopUp(true);
    setEditArticle(false)
    setAddArticle(false)
  }

  const deleteArt = () => {
    setLoading(true);
    axios
      .delete(`https://witchblog.azurewebsites.net/api/v1/articles/${article.id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setShowPopUpDelete(false)
        setLoading(false);
        navigate('/Articles')
      })
      .catch((err) => {
        setShowPopUpDelete(false)
        setLoading(false);
        navigate('/Articles')
      });
  };

  return (
    <div className="articles-wrapper">
      {loading ? (
        <div className="loading_wrapper">
          <div className="loading_spin"></div>
          <div className="loading_text">Consulting Business Analitic</div>
        </div>
      ) : (
      <>
      {showPopUp ? (
      <DeletePopUp setShow={setShowPopUp}>
        <h1 className="sign-in-err-h1">
          Edit/Add article information
        </h1>
        <span>{popUpMessage}</span>
      </DeletePopUp>) : (<></>)}

      {showPopUpDelete ? (
      <DeletePopUp setShow={setShowPopUp} customFunction={deleteArt}>
        <h1 className="sign-in-err-h1">
          Are you sure you want to delete your account?
        </h1>
        <span>This action is irreversible.</span>
      </DeletePopUp>) : (<></>)}
      
      {addArticle ? (<AddArticle updatePopUpMessage={updatePopUpMessage}/>):(
      <>
        {editArticle ? (
        <EditArticle updatePopUpMessage={updatePopUpMessage} article={article}/>
        ) : (
        <>
          <div className="articles-box">
            <span className="article-title">{article.title}</span>
            <span className="article-body">{article.content}</span>
          </div>
          <div className="page-nav">
          {pageCount-1 ? (<>
            {pageNo > 0 ? (<Link className="prev-article" to={'/Articles/' + encodeURIComponent( parseInt(pageNo)-1 )}>
              <span>&#8592;</span>
            </Link>) : (<></>)}
            <span className="page-no">{pageNo}</span>
            {pageNo < pageCount-1 ? (
            <Link className="next-article" to={'/Articles/' + encodeURIComponent( parseInt(pageNo)+1 )}>
              <span>&#8594;</span>
            </Link>):(<></>)}
          </>) : (<></>)}
          </div>
          {isUserModerator ? (
          <div className="btns-articles">
            <button
            onClick={() => setAddArticle(true)}
            className="button-articles"
            type="submit"
            >
            Add article
            </button>
            <button
            onClick={() => setEditArticle(true)}
            className="button-articles"
            type="submit"
            >
            Edit article
            </button>
            <button
            onClick={() => setShowPopUpDelete(true)}
            className="button-articles"
            type="submit"
            >
            Delete article
            </button>
          </div>):(<></>)}
        </>)}
      </>)}
      </>)}
    </div>
  );
};

export default Articles;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTokenStatus from "../hooks/useTokenStatus";
import axios from "axios";
import "../styles/Articles.css";

const Articles = () => {
  const { pageNo = 0 } = useParams()
  const [pageCount, setPageCount] = useState(1)
  const isToken = useTokenStatus();

  const [article, setArticle] = useState({})

  useEffect(() => {
    axios
      .get("https://witchblog.azurewebsites.net/api/v1/articles")
      .then((res) => {
        setPageCount(res.data.numberOfElements)
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://witchblog.azurewebsites.net/api/v1/articles?pageSize=1&pageNo=${pageNo}`)
      .then((res) => {
        setArticle(res.data.content[0])
      })
      .catch((err) => console.log(err));
  },[isToken,pageNo])

  useEffect(()=>console.log(article))

  return (
    <div className="articles-wrapper">
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
    </div>
  );
};

export default Articles;

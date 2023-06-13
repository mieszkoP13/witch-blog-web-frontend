import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/Articles.css";
const RE_TITLE = /^\S.{3,30}$/;

const EditArticle = ({updatePopUpMessage,article}) => {
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(true)
  const hideEdit = () => setEdit(false)

  const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm({defaultValues: {title: article.title, content: article.content}});
  
  const onSubmit = (data) => {
    hideEdit()
    reset()
    setLoading(true);
    axios
      .put(`https://witchblog.azurewebsites.net/api/v1/articles/${article.id}`,data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        updatePopUpMessage("Success. Article has been edited.")
        setLoading(false);
      })
      .catch((err) => {
        updatePopUpMessage("Error. Article hasn't been edited.")
        setLoading(false);
      });
  }

  return (
  <>
  {loading ? (
    <div className="loading_wrapper">
      <div className="loading_spin"></div>
      <div className="loading_text">Consulting Business Analitic</div>
    </div>
  ) : (<>
  {edit ? (
  <>
      <div className="articles-box">
          <input className="article-input"
          {...register("title", {
              required: true,
              pattern: { value: RE_TITLE },
          })}
          />
          {errors.title ? (<p className="error-txt">Invalid Title.</p>)
          : (<p className="invisible error-txt">Invalid Title.</p>)}
          <textarea
          {...register("content", {
              required: true,
          })}
          />
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        className="button"
        type="submit"
      >
        Save article
      </button>
  </>):(<></>)}
  </>)}
  </>
  )
}

export default EditArticle
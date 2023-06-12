import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/Articles.css";
const RE_TITLE = /^\S.{3,30}$/;

const AddArticle = ({updatePopUpMessage}) => {
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState(true)
  const hideEdit = () => setEdit(false)

  const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm();
  
  const onSubmit = (data) => {
    hideEdit()
    reset()
    setLoading(true);
    axios
      .post("https://witchblog.azurewebsites.net/api/v1/articles",data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        updatePopUpMessage("Success. Article has been added.")
        setLoading(false);
      })
      .catch((err) => {
        updatePopUpMessage("Error. Article hasn't been added.")
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

export default AddArticle
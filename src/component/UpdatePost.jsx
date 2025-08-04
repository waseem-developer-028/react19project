import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

const validationSchema = Yup.object({
  title: Yup.string().required().min(2, "Min 2 chars long"),
  body: Yup.string().required().min(2, "Min 2 chars long"),
});

const UpdatePost = () => {
  const {
    register,
    reset,
    formState: { touchedFields, errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const { setPosts } = useOutletContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getPostById = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      reset({
        title: res?.data?.title,
        body: res?.data?.body,
      });
    } catch (e) {
      toast.error(e.message);
      setError(true);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  const editPost = async (data) => {
    try {
      const res = await axios.put(`/posts/${id}`, data);
      setPosts((prev) => {
        return prev.map((curElem) => {
          return curElem.id === res.data.id ? res.data : curElem;
        });
      });
      reset();
      toast.success("Post Updated Successfully");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="header">
        {error ? (
          <h1>
            Something is wrong{" "}
            <button
              className="add-btn"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </h1>
        ) : (
          <h1>
            Crud With Axios{" "}
            <button className="add-btn" onClick={() => navigate("/")}>
              Back
            </button>
          </h1>
        )}
      </div>
      <div className="post-container">
        <form className="form-container" onSubmit={handleSubmit(editPost)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter post title"
              className={`title ${
                (touchedFields["title"] && errors.title) || errors.title
                  ? "border-red"
                  : ""
              }`}
              {...register("title")}
            />
            {errors.title && <p className="text-red">{errors.title.message}</p>}
          </div>
          <div className="form-group">
            <textarea
              className={`body ${
                (touchedFields["body"] && errors.body) || errors.body
                  ? "border-red"
                  : ""
              }`}
              rows={12}
              cols={20}
              placeholder="Enter post body"
              {...register("body")}
            ></textarea>
            {errors.body && <p className="text-red">{errors.body.message}</p>}
          </div>
          <button className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;

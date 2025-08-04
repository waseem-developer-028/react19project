import axios from "axios";
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { posts, error, setError, setPosts } = useOutletContext();
  const navigate = useNavigate();

  const deletePostById = async (id) => {
    if (confirm("Are you sure delete this record?")) {
      try {
        await axios.delete(`/posts/${id}`);
        setPosts((prev) => prev.filter((post) => post.id !== id));
        toast.success("Post Deleted Successfully!!");
      } catch (e) {
        toast.error(e.message);
        setError(true);
      }
    }
    return;
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
            <button className="add-btn" onClick={() => navigate("/add")}>
              Add post
            </button>
          </h1>
        )}
      </div>
      <div className="card-container">
        {posts?.map((post) => (
          <div className="card" key={post.id}>
            <h5>{post.id}</h5>
            <h6>{post.title}</h6>
            <p>{post.body}</p>
            <div className="button-container">
              <button
                className="edit-btn"
                onClick={() => navigate(`/update/${post.id}`)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePostById(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

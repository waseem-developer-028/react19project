import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import axios from "axios";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const res = await axios.get(
        "/posts?_limit=10"
      );

      setPosts(res.data);
    } catch (e) {
      toast.error(e.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "blue",
          height: "100vh",
        }}
      >
        <h1>Loading ....</h1>
      </div>
    );
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Outlet context={{ error, setError, posts, setPosts }} />
    </div>
  );
};

export default App;

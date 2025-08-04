import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import "./index.css";
import router from "./routes/AppRouter";

axios.defaults.baseURL =  import.meta.env.VITE_API_URL

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      response.data.customField = "Waseem";
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

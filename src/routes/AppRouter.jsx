import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../component/Home";
import AddPost from "../component/AddPost";
import UpdatePost from "../component/UpdatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add",
        element: <AddPost />,
      },
      {
        path: "/update/:id",
        element: <UpdatePost />,
      },
    ],
  },
]);

export default router;

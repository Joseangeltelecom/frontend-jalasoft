import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import CommentDetails from "./Pages/CommentDetails/CommentDetails";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ErrorPage from "./Pages/Error/ErrorPage";
import Welcome from "./Pages/Welcome/Welcome";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path={"/"} element={<Welcome />} />
      <Route path={"/dashboard/comments"} element={<DashBoard />} />
      <Route path={"/dashboard/comments/:id"} element={<CommentDetails />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

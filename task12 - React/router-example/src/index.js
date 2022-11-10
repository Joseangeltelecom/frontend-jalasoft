import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Welcome from "./Pages/Welcome/Welcome";
import ErrorPage from "./Pages/Error/error-page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path={"/"} element={<Welcome />} />
      <Route path={"/Dashboard"} element={<DashBoard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

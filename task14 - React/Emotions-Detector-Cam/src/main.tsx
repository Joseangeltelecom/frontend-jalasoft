import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Error from "./Pages/ErrorPage";
import { WebCamDisplay } from "./Pages/WebCamDisplay";
import ContextProvider from "./Context/PhotoContext";
import Pictures from "./Pages/PhotoList";
import RootLayout from "./Components/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route path="/" element={<WebCamDisplay />} />
        <Route path="/photos" element={<Pictures />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/reset.css";
import Home from "./features/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

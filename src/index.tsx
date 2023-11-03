import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/reset.css";
import Home from "./features/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Control from "./features/Control";
import NotFound from "./features/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/controle" element={<Control />} />

        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

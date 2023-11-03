import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/Home";
import Control from "./features/Control";
import NotFound from "./features/NotFound";

export default function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/controle" element={<Control />} />
        </Routes>
      </Router>
    );
  }
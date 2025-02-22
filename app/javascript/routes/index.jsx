import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Image from "../components/Image/Image.jsx";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/image" element={<Image />} />
    </Routes>
  </Router>
);

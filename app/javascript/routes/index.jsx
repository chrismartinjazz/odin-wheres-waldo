import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Images from "../components/Images/Images.jsx";
import Image from "../components/Image/Image.jsx";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<Images />} />
      <Route path="/image/:id" element={<Image />} />
    </Routes>
  </Router>
);

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayFolder from "./pages/DisplayFolder";
import { useState } from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/displayfolder" element={<DisplayFolder />} />
      </Routes>
    </Router>
  );
};

export default App;

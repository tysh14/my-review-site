import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayFolder from "./pages/DisplayFolder";
import Testing from "./pages/testing";
import { useState } from "react";

const App = () => {
  //const [currFolder, setCurrFolder] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/displayfolder" element={<DisplayFolder />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
  );
};

export default App;

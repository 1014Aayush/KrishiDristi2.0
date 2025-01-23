
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar"
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import "./App.css";
import "./firebase-config.js";


function App() {
  return (
    <div className="app-container">
      {/*      <h1>mahir</h1>
      <Link to="/page2">Go to Page 2</Link>
      <Link to="/page3">Go to Page 3</Link>

      <Routes>
        <Route path="/page2" element={<Page2 />} />
      </Routes>
      <Routes>
        <Route path="/page3" element={<Page3 />} />
      </Routes>*/}
      <Navbar />
      <Page1 />
      <Page2 />
      <Page3 />
    </div>
  );
}

export default App;

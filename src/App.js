import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Intro from './componentsJS/Intro';
import Home from './componentsJS/Home';
import Header from './componentsJS/Header';
import Menu from './componentsJS/Menu';
import PartOne from './componentsJS/PartOne';
import PartTwo from './componentsJS/PartTwo';
import PartThree from './componentsJS/PartThree';
import Podcast from './componentsJS/Podcast';


function App() {


  return (
    <div className="App">
      <Header className="header-fixed" />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/part-one" element={<PartOne />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/part-two" element={<PartTwo />} />
        <Route path="/part-three" element={<PartThree />} />

        </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

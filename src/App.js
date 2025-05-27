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
import PartTwoSub from './componentsJS/PartTwoSub';
import VideoPage from './componentsJS/VideoPage ';
import GameIntro from './componentsJS/GameIntro';
import GameExplaine from './componentsJS/GameExplaine';
import Game from './componentsJS/Game'
import SummaryPoints from './componentsJS/SummaryPoints'
import FinalScreen from './componentsJS/FinalScreen'
import Quiz from './componentsJS/Quiz'





function App() {
  return (
    <div className="App">
      <Header className="header-fixed" />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/part-one" element={<PartOne />} />
        <Route path="/part-two" element={<PartTwo />} />
        <Route path="/subChosing" element={<PartTwoSub />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/part-three" element={<PartThree />} />
        <Route path="/game-intro" element={<GameIntro />} />
        <Route path="/game-explain" element={<GameExplaine />} />
        <Route path="/game" element={<Game/>} />
        <Route path="/summary-points" element={<SummaryPoints/>} />
        <Route path="/final-screen" element={<FinalScreen/>} />
        <Route path="/test" element={<Quiz/>} />


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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import { useLocation } from 'react-router-dom';

const VideoPage  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prompt = location.state?.prompt;

  return (
    <div id="videoPage">
      <img className="white-cactus" src={`${process.env.PUBLIC_URL}/assets/imgs/white-cactus.png`} />

      <div className="circle-div-video">
      <h2>קיבלת פרומפט:</h2>
      <p>{prompt}</p>
       </div>

      <div className="footer"></div>
    </div>
  );
};

export default VideoPage;

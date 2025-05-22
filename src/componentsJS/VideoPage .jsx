import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import { useLocation } from 'react-router-dom';
import secondPart from '../data/videoData'
const VideoPage  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prompt = location.state?.prompt;

  return (
    <div id="videoPage">
      <img className="cactus-img" src={secondPart[prompt].imgSrc} />

      <div className="circle-div-video">
        <h1 className='page-title-video'>{prompt}</h1>

       </div>

      <div className="footer"></div>
    </div>
  );
};

export default VideoPage;

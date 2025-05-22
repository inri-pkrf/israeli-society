import React from 'react';
import '../componentsCSS/VideoPageStep2.css';

const VideoPageStep2 = ({ videoSrc, videoInfo, onNextStep }) => {

  const goToNextStep = () => {
    if (onNextStep) {
      onNextStep(); // פשוט מעביר סיגנל לאב
    }
  };

  return (
    <div className="video-step2">
      <p className='video-info2'>{videoInfo}</p>
      <video controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        className="next-step-button-2"
        onClick={goToNextStep}
      >
        לשלב הבא
      </button>
    </div>
  );
};

export default VideoPageStep2;

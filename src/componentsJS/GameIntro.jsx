import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/GameIntro.css';
import AudioPlayer from '../componentsJS/AudioPlayer';

const GameIntro = () => {
  const navigate = useNavigate();
  const audioSrc = `${process.env.PUBLIC_URL}/assets/audio/thirdPart.wav`;
  const [showButton, setShowButton] = useState(false);

  const handleAudioEnded = () => {
    setShowButton(true);
  };


 
  return (
    <div id="game-intro">
        <h3 className="part-titlethree">חלק שלישי
        </h3>
      <h1 className="GameInto-title" > נקודות ממשק
בין החברה החרדית לערבית

      </h1>
      <div className="audio-container-game">
          <AudioPlayer src={audioSrc} className="Audio-player" onEnded={handleAudioEnded} isDarkMode={true}  />
        </div>
        {!showButton && (
            <p className='pod-explain'>הקשיבו לדברי ההסבר על הקווים המשיקים בין החברה החרדית לערבית
</p>
        )}
        {showButton && (
          <button className="next-button-game" onClick={() => navigate('/game-explain')}>
            המשך לחלק הבא
          </button>
        )}

    

 
<div className="footer"></div>
    </div>
  );
};

export default GameIntro;
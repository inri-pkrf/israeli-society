import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import '../componentsCSS/PartOne.css';
import AudioPlayer from '../componentsJS/AudioPlayer';

const PartOne = () => {
  const navigate = useNavigate();
  const audioSrc = `${process.env.PUBLIC_URL}/assets/audio/fIrstPart.wav`;



 
  return (
<div id="partOne">
    <img  className="white-cactus" src={`${process.env.PUBLIC_URL}/assets/imgs/white-cactus.png`}  />

    <div className="circle-div">
      <p className='PartOne-subTitle'>חלק ראשון</p>
      <h1 className='PartOne-title'>רקע:רבדי החברה הישראלית,<br/>מאפיינים והשפעות</h1>
      <div className="audio-container">
      <AudioPlayer src={audioSrc} className="Audio-player" />
    </div>
    <p className='PartOne-explaining'>הקשיבו לדברי הפתיחה על התכנים שנלמד והכלים שתצאו איתם בסוף הדרך 
    </p>

   

    </div>
     

 
<div className="footer"></div>
    </div>
  );
};

export default PartOne;
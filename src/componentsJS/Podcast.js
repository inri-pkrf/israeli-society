import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import jsonData from '../data/firstPart.json'; // ייבוא קובץ ה-JSON

import '../componentsCSS/Podcast.css';

const Podcast = () => {
  const navigate = useNavigate();
  const points = Object.entries(jsonData); // הפיכת האובייקט לזוגות של [key, value]



 
  return (
<div id="podcast">
    <p  className="order"> לחצו על הנקודה על מנת להתקדם    </p>
    <div className="points">
      {points.map(([key, value]) => (
        <div id={`image-${value.id}`}>
            <p className="point-number">{value.id}</p>
          <img
             // יצירת ID ייחודי
            className="next-point"
            src={`${process.env.PUBLIC_URL}/assets/imgs/nextBtn.png`}
            alt={value.title} // שימוש בכותרת מתוך ה-JSON
          />
          </div>
      ))}
    <div className="circle-div"></div>
     

 
<div className="footer"></div>
    </div>
    </div>
  );
};

export default Podcast;
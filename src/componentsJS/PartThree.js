import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/PartThree.css';

const Partthree = () => {
  const navigate = useNavigate();


 
  return (
    <div id="part-three">
        <h3 className="part-titlethree">חלק שלישי
        </h3>
      <h1 className="Partthree-title" > נקודות ממשק
ומה הכי חשוב לזכור

      </h1>
      <p className='instructions-partthree'>בחלק זה יש להשלים את הצפייה והפעילות בכל הרכיבים כדי להתקדם.


      </p>
      <div className="go-next">
      <img className="next-cir" src={`${process.env.PUBLIC_URL}/assets/imgs/nextBtn.png`} onClick={()=>{navigate("/game-intro")}} />
      <img  className="next-arrow" src={`${process.env.PUBLIC_URL}/assets/imgs/arrow.png`}  />
      <p  className="next-text">יאללה ממשיכים</p>

      </div>

 
<div className="footer"></div>
    </div>
  );
};

export default Partthree;
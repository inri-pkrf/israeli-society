import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/PartOne.css';

const PartOne = () => {
  const navigate = useNavigate();


 
  return (
    <div id="part-one">
        <h3 className="part-titleOne">חלק ראשון
        </h3>
      <h1 className="PartOne-title" > רקע: רבדי החברה הישראלית, מאפיינים והשפעות 
      </h1>
      <p className='instructions-partOne'>בחלון הבא יופיעו בפניכם סמנים לבנים, יש ללחוץ על העיגול הלבן כדי לצפות בתוכן ולהתקדם. 
      </p>
      <div className="go-next">
      <img className="next-cir" src={`${process.env.PUBLIC_URL}/assets/imgs/nextBtn.png`} onClick={()=>{navigate("/podcast")}} />
      <img  className="next-arrow" src={`${process.env.PUBLIC_URL}/assets/imgs/arrow.png`}  />
      <p  className="next-text">יאללה ממשיכים</p>

      </div>

 
<div className="footer"></div>
    </div>
  );
};

export default PartOne;
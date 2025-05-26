import React, { useState } from 'react';
import SummaryCards from '../componentsJS/SummaryCards'; // ודא שהקומפוננטה קיימת
import '../componentsCSS/SummaryPoints.css';

const SummaryPoints = () => {
  const [showCards, setShowCards] = useState(false);

  const handleNext = () => {
    setShowCards(true); // מציג את הקומפוננטה של הכרטיסיות
  };
  const handleExit = () => {
    setShowCards(false); // חוזר למסך ההסבר
  };
  
  if (showCards) {
    return <SummaryCards onExitToSummary={handleExit} />;
  }
  
  return (
    <div id="summary-explaine">
      <h3 className="part-titlethree">חלק שלישי</h3>
      <h1 className="summaryExp-title">10 נקודות שהכי חשוב לזכור</h1>
      <p className='instructions-summary'>
        לפניך משחק בו יש לזהות מהם המאפיינים המשותפים בין החברה החרדית והערבית. 
        <br />
        המשפטים יתחלפו במסך, יש לקרוא את המשפט וללחוץ עליו, רק אם לדעתך מסמל מאפיין מקביל.
        <br />
        אל דאגה, סידרנו סיבוב ניסיון לחימום לפני שמתחילים.
      </p>
      
      <div className="card-arrows-sum">
  <button className="backward" disabled ></button>
  <button className="forward" onClick={handleNext}></button>
</div>

      <div className="footer-summary"></div>
    </div>
  );
};

export default SummaryPoints;

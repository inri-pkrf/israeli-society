import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/Hamburger.css';

const Hamburger = ({ data, selectedTopic }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open

  // סטטוס השלמת החלקים
  const [completedParts, setCompletedParts] = useState({
    partOne: false,
    partTwo: false,
    partThree: false,
  });

  // נושאים במערכת
  const subjects = [
    { name: 'עמוד הבית', path: '/menu' },
    { name: 'חלק ראשון', path: '/partOne', subTopics: ['רבדי החברה הישראלית'], partKey: 'partOne' },
    { name: 'חלק שני', path: '/partTwo', subTopics: ['החברה החרדית', 'החברה הערבית', 'מוגבלויות', 'הגיל השלישי'], partKey: 'partTwo' },
    { name: 'חלק שלישי', path: '/partThree', subTopics: ['משחק קווים משיקים', 'נקודות נוספות'], partKey: 'partThree' },
    { name: 'בוחן', path: '/final', subTopics: [] }
  ];

  // פונקציה לשמירה של סטטוס ב-`sessionStorage`
  const saveCompletionStatus = (partKey) => {
    sessionStorage.setItem(partKey, 'completed');
    setCompletedParts((prevState) => ({ ...prevState, [partKey]: true }));
  };

  // פונקציה לבדוק אם המשתמש ביקר בחלק הקודם
  const checkPreviousPart = (currentPartKey) => {
    const currentPartIndex = subjects.findIndex((subject) => subject.partKey === currentPartKey);
    if (currentPartIndex === 0) return true; // החלק הראשון תמיד זמין

    const previousPartKey = subjects[currentPartIndex - 1].partKey;
    return sessionStorage.getItem(previousPartKey) === 'completed';
  };

  // פונקציה לטפל בקליק על נושא
  const handleTopicClick = (path, partKey) => {
    if (!checkPreviousPart(partKey)) {
      // במקום הודעת אזהרה, ננעל את הלחיצה
      return;
    }

    // נווט ישירות לנתיב
    navigate(path);
    setIsOpen(false);  // סוגר את המבורגר לאחר הניווט

  };

  // פונקציה לפתיחת/סגירת dropdown
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // פונקציה להפעלת המבורגר
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // פונקציה לשדרג את סטטוס החלק לאחר סיום
  const handleCompletePart = (partKey) => {
    saveCompletionStatus(partKey); // שומר את סטטוס החלק כמשלים
  };

  // בדיקת סטטוס השלמת החלקים (בעת טעינת הדף)
  useEffect(() => {
    const partOneStatus = sessionStorage.getItem('partOne') === 'completed' || true; // תמיד זמין בהתחלה
    const partTwoStatus = sessionStorage.getItem('partTwo') === 'completed';
    const partThreeStatus = sessionStorage.getItem('partThree') === 'completed';

    setCompletedParts({
      partOne: partOneStatus,
      partTwo: partTwoStatus,
      partThree: partThreeStatus,
    });
  }, []);

  return (
    <div>
      <div className="hamburger-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`}
          alt="Decorative"
          className="whiteLogoHam"
        />

        <ul className="menu-list">
          {subjects.map((subject, index) => (
            <React.Fragment key={index}>
              <li
                className={`menu-item ${location.pathname === subject.path ? 'active' : ''} 
                ${subject.path !== '/menu' && !completedParts[subject.partKey] ? 'locked' : ''}`}
                onClick={() => handleTopicClick(subject.path, subject.partKey)}
              >
                {subject.subTopics && subject.subTopics.length > 0 && (
                  <span
                    className={`dropdown-arrow ${activeDropdown === index ? 'open' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // למנוע סגירה מידית של ההמבורגר
                      handleDropdownToggle(index);
                    }}
                  >
                    &#9654; {/* חץ קטן שמסתובב */}
                  </span>
                )}
                <span>{subject.name}</span>
                {subject.path !== '/menu' && !completedParts[subject.partKey] && (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/imgs/lock.png`}
                    className='lock-icon'
                  />
                )}
              </li>

              {/* הצגת תתי נושאים תחת כל כותרת */}
              {activeDropdown === index && subject.subTopics && subject.subTopics.length > 0 && (
                <ul className="submenu">
                  {subject.subTopics.map((subTopic, subIndex) => (
                    <li
                      key={subIndex}
                      className={`submenu-item ${location.pathname.includes(subTopic) ? 'active' : ''}`}
                      onClick={() => handleTopicClick(`/topic/${subTopic}`, subject.partKey)} // נתיב לכל תת נושא
                    >
                      {subTopic}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hamburger;

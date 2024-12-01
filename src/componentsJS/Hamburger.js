import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/Hamburger.css';

const Hamburger = () => {
  const navigate = useNavigate();
  const [visitedPages, setVisitedPages] = useState(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];
    return storedPages;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({}); // Track which dropdowns are open

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuClick = (path, isSubtopic = false) => {
    // אם מדובר בתת-נושא, יש לאפשר את המעבר
    if (isSubtopic) {
      navigate(path);
    } else {
      // אם מדובר בחלק ראשי, בודקים אם הדף נפתח והאם יש גישה אליו
      if (path !== '/menu' && path !== '/part-one' && !visitedPages.includes(path)) return;
      setIsOpen(false); // Close the menu after selection
      navigate(path);
    }
  };
  
  
  const handleSubmenuToggle = (path) => {
    navigate(path);
  };

  const toggleDropdown = (path) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [path]: !prev[path], // להפוך את המצב של ה-dropdown אם הוא פתוח או סגור
    }));
  };
  

  const parts = [
    { name: 'עמוד הבית', path: '/menu', locked: false, subtopics: [] }, // No dropdown for home
    { 
      name: 'חלק ראשון', 
      path: '/part-one', 
      locked: false, 
      subtopics: [
        { name: 'רבדי החברה הישראלית', path: '/subtopic1' }
      ] 
    }, // Dropdown for part one
    { 
      name: 'חלק שני', 
      path: '/part-two', 
      locked: !visitedPages.includes('/part-one'),
      subtopics: [
        { name: 'החברה החרדית', path: '/subtopic2' },
        { name: 'החברה הערבית', path: '/subtopic3' },
        { name: 'מוגבלויות + הגיל השלישי', path: '/subtopic4' },
 
      ] 
    }, // Dropdown for part two, locked based on part one completion
    { name: 'חלק שלישי', path: '/part-three', locked: !visitedPages.includes('/part-two'),  subtopics: [
      { name: 'משחק קווים משיקים', path: '/subtopic5' },
      { name: 'נקודות נוספות', path: '/subtopic6' }
    ] }, 
    { name: 'בוחן סיום', path: '/final', locked: !visitedPages.includes('/part-three'), subtopics: [] }
  ];

  return (
    <div>
      <div className="hamburger-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`} alt="Decorative" className="whiteLogoHam" />
        <ul className="menu-list">
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <li
                onClick={() => handleMenuClick(part.path)}
                className={`menu-item ${visitedPages.includes(part.path) ? 'active' : ''} ${part.locked ? 'fade' : ''}`}
                style={{ cursor: part.locked ? 'not-allowed' : 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                 
             
                {part.locked && (
                    <img src={`${process.env.PUBLIC_URL}/assets/imgs/lock.png`} alt="Lock Icon"  className='lock-icon' />
                  )}
                  {part.name}
                  {part.subtopics.length > 0 && (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/imgs/next.png`} // הנתיב לתמונה
                    alt="Next" // תיאור התמונה
                    className={`dropdown-arrow ${openDropdown[part.path] ? 'open' : ''}`} // הוספת ה-class open אם ה-dropdown פתוח
                    onClick={(e) => { 
                      e.stopPropagation(); // למנוע את הפעלת ה-click של התפריט הראשי
                      toggleDropdown(part.path); // הפעלת פעולת dropdown
                    }}
                    disabled={part.locked} // אם זה נעול, התמונה תהיה לא לחיצה
                  />
                )}
                
               
                </div>
                {openDropdown[part.path] && !part.locked && part.subtopics.length > 0 && (
                  <ul className="submenu-list">
                     {part.subtopics.map((subtopic, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={() => handleSubmenuToggle(subtopic.path)} // השתמש ב- handleSubmenuToggle כאן
                          className="submenu-item"
                        >
                          {subtopic.name}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>

        <div className="mashov-menu">
          <div className="mashovTextMenu">
            <br /> יש הערות על הממשק? יש מחמאות? מלאו את השאלון וצרו איתנו קשר
            <br />
            <a
              id="linkMenu"
              href="https://docs.google.com/forms/d/e/1FAIpQLSflGabIbTG0fNDp_MGmI64a9xzg4AHkJNyH7DovtxicCIuIhw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              בקישור הבא
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;

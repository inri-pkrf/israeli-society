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
  const [openDropdown, setOpenDropdown] = useState({});

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (path) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleMenuClick = (path) => {
    if (!visitedPages.includes(path)) {
      const updatedVisitedPages = [...visitedPages, path];
      setVisitedPages(updatedVisitedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedVisitedPages));
    }

    navigate(path);
    setIsOpen(false);
    console.log('Visited pages:', visitedPages);
    console.log('Current path:', path);
  };

  const parts = [
    { name: 'עמוד הבית', path: '/menu', locked: false, subtopics: [] },
    {
      name: 'חלק ראשון',
      path: '/part-one',
      locked: false,
      subtopics: [{ name: 'רבדי החברה הישראלית', path: '/podcast' }],
    },
    {
      name: 'חלק שני',
      path: '/part-two',
      locked: !visitedPages.includes('/part-one') && !visitedPages.includes('/podcast'),
      subtopics: [
        { name: 'החברה החרדית', path: '/subtopic2' },
        { name: 'החברה הערבית', path: '/subtopic3' },
        { name: 'מוגבלויות + הגיל השלישי', path: '/subtopic4' },
      ],
    },
    {
      name: 'חלק שלישי',
      path: '/part-three',
      locked: !visitedPages.includes('/part-two') && !visitedPages.includes('/subtopic2') && !visitedPages.includes('/subtopic3') && !visitedPages.includes('/subtopic4'),
      subtopics: [
        { name: 'משחק קווים משיקים', path: '/subtopic5' },
        { name: 'נקודות נוספות', path: '/subtopic6' },
      ],
    },
    { name: 'בוחן סיום', path: '/final', locked: !visitedPages.includes('/part-three'), subtopics: [] },
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
                className={`menu-item ${visitedPages.includes(part.path) ? 'active' : ''} ${part.locked ? 'fade' : ''}`}
                style={{ cursor: part.locked ? 'not-allowed' : 'pointer' }}
                onClick={() => !part.locked && handleMenuClick(part.path)}
              >
                <div style={{ display: 'flex', alignItems: 'center', }}>
                  {part.locked && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/imgs/lock.png`}
                      alt="Lock Icon"
                      className="lock-icon"
                    />
                  )}
                  {part.name}
                  {part.subtopics.length > 0 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/imgs/next.png`}
                      alt="Next"
                      className={`dropdown-arrow ${openDropdown[part.path] ? 'open' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(part.path);
                      }}
                    />
                  )}
                </div>
                {openDropdown[part.path] && part.subtopics.length > 0 && (
                  <ul className="submenu-list">
                    {part.subtopics.map((subtopic, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => handleMenuClick(subtopic.path)}
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

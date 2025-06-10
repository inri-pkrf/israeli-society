import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/Header.css';
import Hamburger from './Hamburger';
import NavBar from './NavBar';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // בודק אם המסלול הוא "/home", "/game" או "/test"
  const isSpecialPath = ['/home', '/game', '/test'].includes(location.pathname);

  const imageSrc = isSpecialPath
    ? `${process.env.PUBLIC_URL}/assets/imgs/collegeLogo.png` // צבעוני
    : `${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`; // לבן

  // אם המסלול הוא /home → NavBar בהיר, אחרת כהה
  const isDarkMode = !['/home', '/game', '/test'].includes(location.pathname);


  return (
    <header className={isSpecialPath ? 'header' : 'header2'}>
      {/* תפריט ניווט - המבורגר במובייל, ניווט רגיל בדסקטופ */}
      {isMobile ? <Hamburger className="hamburger" /> : <NavBar isDark={isDarkMode} />}

      <img src={imageSrc} className="App-logo" alt="logo" />

      <button className="back-homeNav" onClick={() => navigate('/home')} />

      {isSpecialPath && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/blueTriangle.png`}
          alt="Decorative"
          className="decorative-photo"
        />
      )}
    </header>
  );
}

export default Header;

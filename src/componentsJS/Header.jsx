import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/Header.css';
import Hamburger from './Hamburger';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // בודק אם המסלול הוא "/home", "/game" או "/test"
  const isSpecialPath = ['/home', '/game', '/test'].includes(location.pathname);

  const imageSrc = isSpecialPath
    ? `${process.env.PUBLIC_URL}/assets/imgs/collegeLogo.png` // צבעוני
    : `${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`; // לבן

  return (
<header className={isSpecialPath ? "header" : "header2"}>
<Hamburger className="hamburger"/>

      <img
        src={imageSrc}
        className="App-logo"
        alt="logo"
      />

      <button
        className="back-homeNav"
        onClick={() => navigate('/home')} // ניווט לעמוד הבית
      >
      </button>

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

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/Menu.css';

const Home = () => {
  const navigate = useNavigate();


 
  return (
    <div id="menu">
      <h1 className="menu-title" > שיעור דיגיטלי על החברה הישראלית</h1>
 
<div className="footer"></div>
    </div>
  );
};

export default Home;
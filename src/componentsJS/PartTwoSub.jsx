import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/PartTwoSub.css';

const PartTwoSub = () => {
  const navigate = useNavigate();


 
  return (
    <div id="part-two">
        <h3 className="part-titletwo">חלק שני
        </h3>
 
<div className="footer"></div>
    </div>
  );
};

export default PartTwoSub;
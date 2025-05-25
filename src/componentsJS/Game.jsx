import React, { useState, useRef } from 'react';
import game from '../data/game';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/GameExplaine.css';

const Game = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const statements = Object.values(game);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragItemRef = useRef(null);
  const correctRef = useRef(null);
  const incorrectRef = useRef(null);

  // פונקציה לבדיקת נקודה בתוך אזור dropzone
  const isInside = (x, y, el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const handleDrop = (isCorrectDrop) => {
    const statement = statements[currentIndex];
    if (!statement) return;

    if (statement.correct === isCorrectDrop) {
      setScore(prev => prev + 1);
      alert('נכון! ניקוד עולה.');
    } else {
      alert('לא נכון, נסה שוב.');
    }

    if (currentIndex < statements.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert(`המשחק נגמר! ניקוד סופי: ${score + (statement.correct === isCorrectDrop ? 1 : 0)} / ${statements.length}`);
    }

    setDragging(false);
    setDragPos({ x: 0, y: 0 });
  };

  // טיפול ב-touch
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setDragging(true);
    setDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    setDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchEnd = (e) => {
    if (!dragging) return;
    if (isInside(dragPos.x, dragPos.y, correctRef.current)) {
      handleDrop(true);
    } else if (isInside(dragPos.x, dragPos.y, incorrectRef.current)) {
      handleDrop(false);
    } else {
      setDragging(false);
      setDragPos({ x: 0, y: 0 });
    }
  };

  return (
    <div className="Gamepage-container">
      <h1 className='Game-title'>משחק קווים משיקים</h1>
      <p className="info-game">יש לגרור את האמרה לצבר המתאים</p>

      <div className="statement-list">
        {statements[currentIndex] && (
          <div
            ref={dragItemRef}
            className="statement-box"
            draggable={!dragging}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', 'dragged')}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              position: dragging ? 'fixed' : undefined,
              left: dragging ? dragPos.x - 50 : undefined,
              top: dragging ? dragPos.y - 20 : undefined,
              zIndex: dragging ? 1000 : undefined,
              touchAction: 'none',
              backgroundColor: '#66c0f4',
              borderRadius: '12px',
              padding: '20px',
              margin: '10px 0',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'grab',
              userSelect: 'none',
            }}
          >
            {statements[currentIndex].text}
          </div>
        )}
      </div>

      <div className="dropzones">
        <div
          ref={incorrectRef}
          className="dropzone incorrect"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(false);
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/catuseWrong.png`} alt="ממש לא" />
          <p>ממש לא</p>
        </div>

        <div
          ref={correctRef}
          className="dropzone correct"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(true);
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/cactuseCorrect.png`} alt="ברור שכיו!" />
          <p>ברור שכיו!</p>
        </div>
      </div>

      <div className="score">
        ניקוד: {score} / {statements.length}
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default Game;

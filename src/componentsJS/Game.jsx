import React, { useState, useRef } from 'react';
import game from '../data/game';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/Game.css';

const Game = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const statements = Object.values(game);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [feedback, setFeedback] = useState(''); // חדש - הודעות פידבק
  const [gameOver, setGameOver] = useState(false); // חדש - האם המשחק נגמר?

  const dragItemRef = useRef(null);
  const correctRef = useRef(null);
  const incorrectRef = useRef(null);

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
      setFeedback('נכון! ניקוד עולה.');
    } else {
      setFeedback(`לא נכון.<br/>${statement.explanation}`);
    }
    

    // בדיקה אם זהו הפריט האחרון
    if (currentIndex < statements.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // סיום המשחק
      setGameOver(true);
    }

    setDragging(false);
    setDragPos({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = dragItemRef.current.getBoundingClientRect();
    setOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
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
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div className="Gamepage-container">
      <h1 className='Game-title'>משחק קווים משיקים</h1>
      {!gameOver ? (
        <>
        <p className="info-game">יש לגרור את האמרה לצבר המתאים</p>
          <div
            className="statement-list"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '28vh',
              width: '100vw',
              minHeight: '120px',
              direction: 'rtl',
            }}
          >
            {statements[currentIndex] && (
              <>
                <div
                  style={{
                    visibility: dragging ? 'hidden' : 'visible',
                    height: '80px',
                    width: '40vw',
                  }}
                >
                  {/* שמור מקום לתיבה בזמן גרירה */}
                </div>

                <div
                  ref={dragItemRef}
                  className="statement-box"
                  draggable={!dragging}
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', 'dragged')}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{
                    position: dragging ? 'fixed' : 'relative',
                    left: dragging ? dragPos.x - offset.x : '50%',
                    top: dragging ? dragPos.y - offset.y : 'auto',
                    transform: dragging ? 'none' : 'translateX(-50%)',
                    zIndex: dragging ? 1000 : 1,
                    touchAction: 'none',
                    backgroundColor: '#66c0f4',
                    borderRadius: '12px',
                    padding: '20px',
                    color: 'white',
                    cursor: 'grab',
                    width: '60vw',
                    direction: 'rtl',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize:'1.4em',
                    fontFamily:'Heebo'
                  }}
                >
                  {statements[currentIndex].text}
                </div>
              </>
            )}
          </div>

          <p className='game-orders'>
            האם המאפיין משותף בין החברה הערבית לחרדית?
          </p>

          {/* אזור הפידבק */}
          {feedback && (
  <div className="feedback">
  <span dangerouslySetInnerHTML={{ __html: feedback }} />
  <button onClick={() => setFeedback('')} className="close-feedback" aria-label="סגור הודעה">×</button>
  </div>
)}

          <div
            className="dropzones"
            style={{ display: 'flex', justifyContent: 'space-between', marginTop: '13vh', gap: '15vw' }}
          >
            <div
              ref={incorrectRef}
              className="dropzone incorrect"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(false);
              }}
              style={{
                width: '45%',
                padding: '5vw',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#DA6C6C',
                direction: 'rtl',
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/catuseWrong.png`}
                alt="ממש לא"
                style={{ maxWidth: '100px', marginBottom: '10px' }}
              />
              <p className='wrong-txt'>ממש לא</p>
            </div>

            <div
              ref={correctRef}
              className="dropzone correct"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(true);
              }}
              style={{
                width: '45%',
                padding: '5vw',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#03A791',
                direction: 'rtl',
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/cactuseCorrect.png`}
                alt="ברור שכן!"
                style={{ maxWidth: '100px', marginBottom: '10px' }}
              />
              <p className='correct-txt'>ברור שכן!</p>
            </div>
          </div>

          <div className="score">
            ניקוד:<br/>{statements.length} / {score}
          </div>
        </>
      ) : (
        // סיום המשחק - מציג הודעת סיום בלבד
        <div className="game-over-message">
  <p className="game-over-txt1">כל הכבוד!</p>
  <p className="game-over-txt2">
    הצלחת לזהות<br />
    {score} / {statements.length} מאפיינים מקבילים בין החברה החרדית לערבית<br />
    בשבילנו את/ה צבר אמיתי!
  </p>

  {/* קונטיינר לתמונות בשורה */}
  <div className="end-images-row">
    <img
      src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusOld.png`}
      alt="כפתור 3"
      className="end-img"
    />
    <img
      src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusDos.png`}
      alt="כפתור 3"
      className="end-img"
    />
    <img
      src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusArab.png`}
      alt="כפתור 3"
      className="end-img"
    />
  </div>
  <button className="next-button-game" onClick={() => navigate('/summary-points')}>
           מעבר לנושא הבא
          </button>
</div>

      )}

      <div className="footer"></div>
    </div>
  );
};

export default Game;

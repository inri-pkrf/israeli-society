import React, { useState } from 'react';
import '../componentsCSS/Questions.css';

const Questions = ({ questions ,startPartThree}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong', or 'showAnswer'

  const currentQuestion = questions[currentIndex];
  const goToPartThree=()=>{
    startPartThree();
  }

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAns) {
      setFeedback('correct');
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer('');
          setFeedback(null);
          setAttempts(0);
        } else {
          setCompleted(true);
        }
      }, 1000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 2) {
        setFeedback('showAnswer');
        setTimeout(() => {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer('');
            setFeedback(null);
            setAttempts(0);
          } else {
            setCompleted(true);
          }
        }, 2000);
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          setSelectedAnswer('');
          setFeedback(null);
        }, 1000);
      }
    }
  };

  if (completed) {
    return (
      <div className="questions">
        <h2 className='excelent'>כל הכבוד! סיימת את השאלון.</h2>
        <button className="next-step-button-Q"  onClick={goToPartThree}>מעבר לנושא הבא
        </button>
      </div>
    );
  }

  return (
    <div className="questions">
      <div className="questions-card">
        <h2>{currentQuestion.question}</h2>
        <div className="answers">
          {[currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3, currentQuestion.answer4].map((answer, index) => {
            let className = 'answer-button';
            if (selectedAnswer === answer) {
              if (feedback === 'correct') {
                className += ' correct';
              } else if (feedback === 'wrong') {
                className += ' wrong';
              }
            }
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswer}
              >
                {answer}
              </button>
            );
          })}
        </div>
        {/* Feedback message */}
        {feedback === 'correct' && (
          <p className="feedback-Q correct">תשובה נכונה!</p>
        )}
        {feedback === 'wrong' && (
          <p className="feedback-Q wrong">תשובה שגויה. נסו שוב.</p>
        )}
        {feedback === 'showAnswer' && (
          <p className="feedback-Q wrong">
            לא נורא, התשובה הנכונה היא: {currentQuestion.correctAns}
          </p>
        )}
      </div>
    </div>
  );
};

export default Questions;

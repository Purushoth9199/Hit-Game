import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const boxes = new Array(9).fill(null);

  useEffect(() => {

    const intervalId = setInterval(() => {
      if (!gameOver) {
        
        const randomIndex = Math.floor(Math.random() * boxes.length);
    
        setKeyword(randomIndex);
        setTimeout(() => setKeyword(''), 1500);
      }
    }, 1100);

    
    setTimeout(() => {
      setGameOver(true);
      clearInterval(intervalId);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [gameOver, boxes.length]);

  function handleBoxClick(index) {
    if (index === keyword) {
      setScore(score + 5);
    } else {
      setScore(score - 2.5);
    }
  }

  return (
    <div className='main'>
      <h1>Hit-Game</h1>
      <div className="grid-container">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`grid-item ${index === keyword ? 'highlight' : ''}`}
            onClick={() => handleBoxClick(index)}
          >
            {index === keyword ? keyword : ''}
          </div>
        ))}
      </div>
      {gameOver && <div>Final Score: {score}</div>}
    </div>
  );
}

export default App;

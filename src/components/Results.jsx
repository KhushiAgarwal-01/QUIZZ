import React from "react";

const Results = ({ score, restartGame }) => {
  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / 5</p>
      <button onClick={restartGame}>Restart Quiz</button>
    </div>
  );
};

export default Results;

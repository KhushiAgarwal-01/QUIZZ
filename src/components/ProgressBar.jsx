
import React from "react";

const ProgressBar = ({ progress, timeLeft, score }) => {
  return (
    <>
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>
      <h2>Time Left: {timeLeft} seconds</h2>
      <h2 className="scoreboard">Score: {score}</h2>
    </>
  );
};

export default ProgressBar;

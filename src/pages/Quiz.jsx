import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti"; // Import confetti animation
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [showLearningMaterial, setShowLearningMaterial] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false); // Confetti state

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      optionClicked(false);
    }
  }, [timeLeft, showResults]);

  useEffect(() => {
    setTimeLeft(15);
  }, [currentQuestionIndex]);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");
        
        // Shuffle the questions before setting them in state
        const shuffledQuestions = response.data.questions.sort(() => Math.random() - 0.5);
  
        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, []);

  const optionClicked = (isCorrect) => {
    setIsCorrectAnswer(isCorrect);
    setSelectedAnswer(true);

    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true); // Show confetti when correct answer is selected

      // Stop confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < 5) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsCorrectAnswer(null);
      setSelectedAnswer(null);
      setShowLearningMaterial(false);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  if (loading) return <div className="loading">Loading questions...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const progress = ((currentQuestionIndex + 1) / 5) * 100;

  return (
    <>
      {showConfetti && <Confetti />} {/* Confetti Animation */}

      <h2 className="heading">Genetics and Evolution</h2>

      <div className="quiz-container">
        {showResults ? (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / 5</p>
            <button onClick={restartGame}>Restart Quiz</button>
          </div>
        ) : (
          <div className="question-card">
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }}></div>
            </div>
            <h2>Time Left: {timeLeft} seconds</h2>
            <h2 className="scoreboard">Score: {score}</h2>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{questions[currentQuestionIndex].description}</p>

            {/* Options */}
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  style={{
                    backgroundColor:
                      selectedAnswer && option.is_correct
                        ? "green"
                        : selectedAnswer && !option.is_correct
                        ? "red"
                        : "",
                    color: selectedAnswer ? "white" : "black",
                  }}
                  onClick={() => optionClicked(option.is_correct)}
                  disabled={selectedAnswer !== null}
                >
                  {option.description}
                </button>
              ))}
            </div>

            {/* Learn and Next Buttons */}
            {selectedAnswer !== null && !showLearningMaterial && (
              <div className="action-buttons">
                <button
                  className="learn-button"
                  onClick={() => setShowLearningMaterial(true)}
                >
                  Learn
                </button>
                <button className="next-button" onClick={handleNextQuestion}>
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Learning Material Modal */}
        {showLearningMaterial && (
          <div className="learning-modal">
            <div className="learning-modal-content">
              <h3>Detailed Explanation</h3>
              <p>{questions[currentQuestionIndex].detailed_solution}</p>
              <h3>Reading Material</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    questions[currentQuestionIndex].reading_material
                      .content_sections,
                }}
              />
              <button
                className="close-button"
                onClick={() => setShowLearningMaterial(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import Results from "../components/Results";
import LearningModal from "../components/LearningModal";
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
  const [showConfetti, setShowConfetti] = useState(false);
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
        const shuffledQuestions = response.data.questions.sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
        setLoading(false);
      } catch (error) {
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
      setShowConfetti(true);
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
      {showConfetti && <Confetti />}
      <h2 className="heading">Genetics and Evolution</h2>
      <div className="quiz-container">
        {showResults ? (
          <Results score={score} restartGame={restartGame} />
        ) : (
          <>
            <ProgressBar progress={progress} timeLeft={timeLeft} score={score} />
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswer={selectedAnswer}
              optionClicked={optionClicked}
            />
            {selectedAnswer !== null && !showLearningMaterial && (
              <div className="action-buttons">
                <button className="learn-button" onClick={() => setShowLearningMaterial(true)}>Learn</button>
                <button className="next-button" onClick={handleNextQuestion}>Next</button>
              </div>
            )}
            {showLearningMaterial && (
              <LearningModal
                question={questions[currentQuestionIndex]}
                onClose={() => setShowLearningMaterial(false)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;

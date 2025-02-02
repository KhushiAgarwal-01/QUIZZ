import React from "react";

const QuestionCard = ({ question, selectedAnswer, optionClicked }) => {
  return (
    <div className="question-card">
      <h2>Question</h2>
      <p>{question.description}</p>
      <div className="options">
        {question.options.map((option, index) => (
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
    </div>
  );
};

export default QuestionCard;

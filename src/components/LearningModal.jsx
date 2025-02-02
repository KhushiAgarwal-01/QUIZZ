import React from "react";

const LearningModal = ({ question, onClose }) => {
  return (
    <div className="learning-modal">
      <div className="learning-modal-content">
        <h3>Detailed Explanation</h3>
        <p>{question.detailed_solution}</p>
        <h3>Reading Material</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: question.reading_material.content_sections,
          }}
        />
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LearningModal;

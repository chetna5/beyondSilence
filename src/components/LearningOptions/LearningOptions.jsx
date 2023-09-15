import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    {
      text: "Public Harassment",
      handler: () => {},
      id: 1,
    },
    { text: "Domestic Violence", handler: () => {}, id: 2 },
    { text: "Legal Rights", handler: () => {}, id: 4 },
    { text: "Safety and Self-Care", handler: () => {}, id: 5 },
    { text: "Emotional Support", handler: () => {}, id: 6 },
    { text: "Reporting and Documentation", handler: () => {}, id: 7 },
    { text: "Community Resources", handler: () => {}, id: 8 },
    { text: "Legal Aid and Services", handler: () => {}, id: 9 },
    { text: "Know Your Rights", handler: () => {}, id: 10 },
    { text: "FAQs", handler: () => {}, id: 11 },
    { text: "Chatbot Support", handler: () => {}, id: 12 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
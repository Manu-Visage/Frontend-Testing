import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

import "./question-paper.css";

const questions = [
  {
    question: "How many Keywords are there in C Programming language ?",
    options: ["23", "32", "33", "43"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "Which of the following functions takes A console Input in Python ?",
    options: ["get()", "input()", "gets()", "scan()"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "Which of the following is the capital of India ?",
    options: ["Mumbai", "Delhi", "Chennai", "Lucknow"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "Which of The Following is must to Execute a Python Code ?",
    options: ["TURBO C", "Py Interpreter", "Notepad", "IDE"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "The Taj Mahal is located in  ?",
    options: ["Patna", "Delhi", "Benaras", "Agra"],
    correctAnswerIndex: 3,
    choosenAnswer: null,
  },
  {
    question: "The append Method adds value to the list at the ?",
    options: ["custom location", "end", "center", "beginning"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "In which year '@' sign was first chosen for its use in e-mail address",
    options: ["1976", "1980", "1977", "1972"],
    correctAnswerIndex: 3,
    choosenAnswer: null,
  },
  {
    question: "Which of the following is not a costal city of india ?",
    options: ["Bengluru", "Kochin", "Mumbai", "vishakhapatnam"],
    correctAnswerIndex: 0,
    choosenAnswer: null,
  },
  {
    question: "Which of The following is executed in browser(client side) ?",
    options: ["perl", "css", "python", "java"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "Which of the following keyword is used to create a function in Python ?",
    options: ["function", "void", "fun", "def"],
    correctAnswerIndex: 3,
    choosenAnswer: null,
  },
  {
    question: "To Declare a Global variable in python we use the keyword ?",
    options: ["all", "var", "let", "global"],
    correctAnswerIndex: 3,
    choosenAnswer: null,
  },
  {
    question: "Who was the 1st President of India",
    options: ["Jawaharlal Nehru", "Rajendra Prasad", "Indira Gandhi", "Sarvepalli Radhakrishnan"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  },
  {
    question: "Which one of the followings is a programming language",
    options: ["HTTP", "HTML", "HPML", "FTP"],
    correctAnswerIndex: 1,
    choosenAnswer: null,
  }
];


const QuestionPaper = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(null));

  const handleOptionClick = (optionIndex) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelections);
    const isCorrect =
      optionIndex === questions[currentQuestionIndex].correctAnswerIndex;

    // Delay to show feedback (optional)
    if (isCorrect && currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500); // 0.5 sec delay
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-paper-container1">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="question-paper-question-paper">
        <div className="question-paper-background"></div>
        <div className="question-paper-glass"></div>
        <div className="question-paper-group44">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`question-paper-rectangle8${index}`}
              onClick={() => handleOptionClick(index)}
              style={{
                backgroundColor:
                  selectedOptions[currentQuestionIndex] === index
                    ? "rgb(137, 144, 137)"
                    : "white",
              }}
            >
              {option}
            </button>
          ))}
          <div className="question-paper-question">
            <span className="question-paper-text10">
              {currentQuestion.question}
            </span>
          </div>
        </div>
        <div className="question-paper-container2">
          <img
            alt="Rectangle781502"
            src="/external/rectangle781502-xkiw-500w.png"
            className="question-paper-rectangle78"
          />
          <div className="question-paper-webcam">
            <Webcam
              height="auto"
              width="100%"
              className="question-paper-camera"
              audio={true}
              
            />
          </div>
          <div className="question-paper-group43">
            {[...Array(10)].map((_, i) => (
              <button
                onClick={() => setCurrentQuestionIndex(i)}
                style={{
                  backgroundColor:
                    currentQuestionIndex === i ? "#818080 " : "rgb(132, 170, 223) ",
                }}
                key={i}
                className={`question-paper-group${33 + i}`}
              >
                <button className={`question-paper-text${20 - i}`}>
                  {i + 1}
                </button>
              </button>
            ))}
          </div>
        </div>
        <div className="question-paper-submit">
          <Link to="/exam-ended">
            <button className="question-paper-text21">Submit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaper;

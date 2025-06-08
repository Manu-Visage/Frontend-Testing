// src/components/question-paper.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as faceapi from "face-api.js";
import "./question-paper.css";

const questions = [
  { question: "How many Keywords are there in C Programming language ?", options: ["23", "32", "33", "43"], correctAnswerIndex: 1 },
  { question: "Which of the following functions takes A console Input in Python ?", options: ["get()", "input()", "gets()", "scan()"], correctAnswerIndex: 1 },
  { question: "Which of the following is the capital of India ?", options: ["Mumbai", "Delhi", "Chennai", "Lucknow"], correctAnswerIndex: 1 },
  { question: "Which of The Following is must to Execute a Python Code ?", options: ["TURBO C", "Py Interpreter", "Notepad", "IDE"], correctAnswerIndex: 1 },
  { question: "The Taj Mahal is located in  ?", options: ["Patna", "Delhi", "Benaras", "Agra"], correctAnswerIndex: 3 },
  { question: "The append Method adds value to the list at the ?", options: ["custom location", "end", "center", "beginning"], correctAnswerIndex: 1 },
  { question: "In which year '@' sign was first chosen for its use in e-mail address", options: ["1976", "1980", "1977", "1972"], correctAnswerIndex: 3 },
  { question: "Which of the following is not a costal city of india ?", options: ["Bengluru", "Kochin", "Mumbai", "vishakhapatnam"], correctAnswerIndex: 0 },
  { question: "Which of The following is executed in browser(client side) ?", options: ["perl", "css", "python", "java"], correctAnswerIndex: 1 },
  { question: "Which of the following keyword is used to create a function in Python ?", options: ["function", "void", "fun", "def"], correctAnswerIndex: 3 },
  { question: "To Declare a Global variable in python we use the keyword ?", options: ["all", "var", "let", "global"], correctAnswerIndex: 3 },
  { question: "Who was the 1st President of India", options: ["Jawaharlal Nehru", "Rajendra Prasad", "Indira Gandhi", "Sarvepalli Radhakrishnan"], correctAnswerIndex: 1 },
  { question: "Which one of the followings is a programming language", options: ["HTTP", "HTML", "HPML", "FTP"], correctAnswerIndex: 1 },
];

const OptionButton = React.memo(({ option, index, isSelected, onClick }) => (
  <button
    className="option-button"
    onClick={() => onClick(index)}
    style={{ backgroundColor: isSelected ? "#899089" : "white" }}
    aria-pressed={isSelected}
  >
    {option}
  </button>
));

OptionButton.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const QuestionPaper = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const detectionInterval = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleOptionClick = useCallback((optionIndex) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelections);

    if (optionIndex === questions[currentQuestionIndex].correctAnswerIndex && currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500);
    }
  }, [currentQuestionIndex, selectedOptions]);

  const startVideoStream = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch((err) => console.error("Error accessing webcam:", err));
  }, []);

  const stopVideoStream = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const processFaceDetection = useCallback(async () => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl || videoEl.readyState < 2) return;

    try {
      const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions();

      const displaySize = { width: videoEl.videoWidth, height: videoEl.videoHeight };
      faceapi.matchDimensions(canvasEl, displaySize);
      const resized = faceapi.resizeResults(detections, displaySize);

      const ctx = canvasEl.getContext("2d");
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      faceapi.draw.drawDetections(canvasEl, resized);
      faceapi.draw.drawFaceLandmarks(canvasEl, resized);
      faceapi.draw.drawFaceExpressions(canvasEl, resized);
    } catch (err) {
      console.error("Face detection error:", err);
    }
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setIsModelsLoaded(true);
      startVideoStream();
    };
    loadModels();
    return () => {
      cancelAnimationFrame(detectionInterval.current);
      stopVideoStream();
    };
  }, [startVideoStream]);

  useEffect(() => {
    const videoEl = videoRef.current;
    const handlePlay = () => {
      const loop = async () => {
        if (isModelsLoaded) await processFaceDetection();
        detectionInterval.current = requestAnimationFrame(loop);
      };
      detectionInterval.current = requestAnimationFrame(loop);
    };
    if (videoEl) videoEl.addEventListener("play", handlePlay);
    return () => {
      if (videoEl) videoEl.removeEventListener("play", handlePlay);
      cancelAnimationFrame(detectionInterval.current);
    };
  }, [isModelsLoaded, processFaceDetection]);

  useEffect(() => {
    if (timeLeft <= 0) {
      stopVideoStream();
      window.location.href = "/exam-ended";
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) alert("Tab switching is not allowed!");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswered = selectedOptions.every(option => option !== null);

  return (
    <div className="question-paper-container">
      <Helmet><title>Online Exam</title></Helmet>

      <div className="question-box">
        <div className="question-text">{currentQuestion.question}</div>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedOptions[currentQuestionIndex] === index}
            onClick={handleOptionClick}
          />
        ))}
      </div>

      <div className="video-section">
        <div className="webcam-wrapper">
          <video ref={videoRef} autoPlay muted playsInline width="300" height="225" style={{ position: "absolute", top: 0, left: 0 }} />
          <canvas ref={canvasRef} width="300" height="225" style={{ position: "absolute", top: 0, left: 0 }} />
        </div>
        <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
      </div>

      <div className="question-nav">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQuestionIndex(i)}
            className="question-nav-btn"
            style={{ backgroundColor: currentQuestionIndex === i ? "#818080" : "#84aadf" }}
            aria-label={`Question ${i + 1}`}
            aria-current={currentQuestionIndex === i ? "true" : "false"}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="submit-btn">
        <Link to="/exam-ended" onClick={stopVideoStream}>
          <button>Submit</button>
          {/* <button disabled={!allAnswered} aria-disabled={!allAnswered}>Submit</button> */}
        </Link>
      </div>
    </div>
  );
};

export default QuestionPaper;

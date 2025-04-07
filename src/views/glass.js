// import React from 'react'
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import "./glass.css";
// import Link from "next/link";

const Glass = (props) => {
  const [examCode, setExamCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Code:", examCode);
    console.log("Password:", password);
  };
  return (
    <div className="glass-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="glass-glass">
        <div className="glass-background">
          {/* <img
            alt="blob11161"
            src="/external/blob11161-ikun.svg"
            className="glass-blob1"
          /> */}
          {/* <img
            alt="blob31161"
            src="/external/blob31161-3v4n.svg"
            className="glass-blob3"
          /> */}
        </div>
        <div className="glass-codepage">
          <img
            alt="pexelslizasummer634791211161"
            src="/external/pexelslizasummer634791211161-9tfh-400h.png"
            className="glass-pexelslizasummer63479121"
          />
          <button className="glass-start-exam-nowbutton">
            {/* <img
              alt="Rectangle72I148"
              src="/external/rectangle72i148-7vf3-200h.png"
              className="glass-rectangle72"
            /> */}
            <div className="glass-startexam">
              {/* <span className="glass-text1">
                Start Exam Now
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
              <img
                alt="VectorI148"
                src="/external/vectori148-sal8.svg"
                className="glass-vector"
              /> */}
              <Link to="/capture-image">
                <button className="gradient-button">
                  <span className="button-text">Start Exam Now</span>
                  <span className="button-icon">➜</span>
                </button>
              </Link>
            </div>
          </button>
          <div className="glass-examcodebutton1">
            <input className="input-password" type="text" />
            <span className="glass-text2">Enter Password:</span>
          </div>
          <div className="glass-examcodebutton2">
            <input className="input-exam-code" type="text" />
            <span className="glass-text3">Enter Exam code:</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glass;

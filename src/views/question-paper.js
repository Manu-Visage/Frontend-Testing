import React from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./question-paper.css";

const QuestionPaper = (props) => {
  return (
    <div className="question-paper-container1">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="question-paper-question-paper">
        <div className="question-paper-background">
          {/* <img
            alt="blob31161"
            src="/external/blob31161-9ubg.svg"
            className="question-paper-blob3"
          /> */}
        </div>
        <div className="question-paper-glass"></div>
        <div className="question-paper-group44">
          <button className="question-paper-rectangle80">
            option 3
          </button>
          <button className="question-paper-rectangle82">
            option 4
          </button>
          <button className="question-paper-rectangle81">
            option 1
          </button>
          <button className="question-paper-rectangle83">
            option 2
          </button>
          <div className="question-paper-question">
            <span className="question-paper-text10">
              What is the area of circle
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
          </div>
        </div>
        <div className="question-paper-container2">
          <img
            alt="Rectangle781502"
            src="/external/rectangle781502-xkiw-500w.png"
            className="question-paper-rectangle78"
          />
          <img
            alt="camera1502"
            src="/external/camera1502-y21-300h.png"
            className="question-paper-camera"
          />
          <div className="question-paper-group43">
            <div className="question-paper-group42">
              <button className="question-paper-text11">10</button>
            </div>
            <div className="question-paper-group41">
              <button className="question-paper-text12">9</button>
            </div>
            <div className="question-paper-group40">
              <button className="question-paper-text13">8</button>
            </div>
            <div className="question-paper-group39">
              <button className="question-paper-text14">7</button>
            </div>
            <div className="question-paper-group38">
              <button className="question-paper-text15">6</button>
            </div>
            <div className="question-paper-group37">
              <button className="question-paper-text16">5</button>
            </div>
            <div className="question-paper-group36">
              <button className="question-paper-text17">4</button>
            </div>
            <div className="question-paper-group35">
              <button className="question-paper-text18">3</button>
            </div>
            <div className="question-paper-group34">
              <button className="question-paper-text19">2</button>
            </div>
            <div className="question-paper-group33">
              <button className="question-paper-text20">1</button>
            </div>
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

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { questions } from "./question";
import { Game } from "./components/Game";
import { Result } from "./components/Result";
import "./index.scss";

export default function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (i) => {
    console.log(step, i);
    setStep(step + 1);
    if (i === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

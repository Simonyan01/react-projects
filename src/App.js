// import { questions } from "./question";
import React from "react";
import { Game } from "./components/Game";
// import { Result } from "./components/Result";
import "./index.scss";

export const App = () => {
  return (
    <div className="App">
      <Game />
      {/* <Result /> */}
    </div>
  );
};

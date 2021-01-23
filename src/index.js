import React from "react";
import ReactDOM from "react-dom";

import Question from "./question";
const text = "This is a book. Programming is hard.";
const sentences = text.split(".");

console.log(sentences);
const App = () => {
  //return <div>hello</div>
  return (
    <div>
      <p>Move the words around to make a correct sentence!</p>
      {sentences.map(
        (sentence) => sentence && <Question sentence={sentence.trim()} />
      )}
    </div>
  );
};

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));

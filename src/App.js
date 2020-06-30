import React from "react";
import "./App.css";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from './Input';

class App extends React.Component {
  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <br/>
        <Input/>
        <GuessedWords guessedWords={[ { guessedWord: "train", letterMatchCount: 3 }]} />
      </div>
    );
  }
}

export default App;

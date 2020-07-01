import React from "react";
import "./App.css";

import hookActions from "./actions/hookActions";
import LanguagePicker from "./LanguagePicker";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type:${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer, 
    { secretWord: null,
    language: "en",
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <Congrats success={true} />
          <br />
          <Input secretWord={state.secretWord} />
        </successContext.SuccessProvider>
        <GuessedWords
          guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
        />
      </languageContext.Provider>
    </div>
  );
}

export default App;

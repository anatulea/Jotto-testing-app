import React from "react";
import PropTypes from "prop-types";
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers';
import guessedWordsContext from './contexts/guessedWordsContext';

function Input({ secretWord }) {
  const language = React.useContext(languageContext);
  const [currentGuess, setCurentGuess] = React.useState("");
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  if (success) { return null }
  return (
    <div data-test="component-input">
      <form className="form-inline" >
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurentGuess(event.target.value)}
        />
        <button 
        data-test="submit-button" 
        className="btn btn-primary mb-2"
        onClick={(event) => {
            event.preventDefault();
             // update guessedWords

            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
            setGuessedWords(newGuessedWords);
            // check against secretWord and update success if needed
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            // clear input box
            setCurentGuess('')}}
        >
        {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
export default Input;

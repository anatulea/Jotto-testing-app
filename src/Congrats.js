import React from "react";
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';


function Congrats(props) {
  
  const language = React.useContext(languageContext);
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
} 
export default Congrats;

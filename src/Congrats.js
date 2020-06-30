import React from "react";

function Congrats(props) {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congradtulations! You guessed the word!
        </span>
      </div>
    );
  }else{
      return (
        <div data-test="component-congrats"/>
      )
  }
}
export default Congrats;

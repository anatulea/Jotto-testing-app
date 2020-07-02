import React from "react";
import Input from "./Input";
import { mount } from "enzyme";
import languageContext from "./contexts/languageContext";
import successContext from './contexts/successContext';
import { findByTestAttr, checkProps } from "../test/testUtils";
import guessedWordsContext from './contexts/guessedWordsContext';

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
       <successContext.SuccessProvider value={[success, jest.fn()]}>
       <guessedWordsContext.GuessedWordsProvider>
         <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};
test("Input renders without error", () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});
test("does not throw an error with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurentGuess]);

    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurentGuess).toHaveBeenCalledWith("train");
  });

  test("field is clean upon submit buttton click", () => {
    const submitBotton = findByTestAttr(wrapper, "submit-button");

    submitBotton.simulate("click", { preventDefault() {} });

    expect(mockSetCurentGuess).toHaveBeenCalledWith("");
  });
});

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });
});
test('input component does not show when success is true', () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});


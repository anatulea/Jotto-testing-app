import React from "react";
import { shallow } from "enzyme";

import GuessedWords from "./GuessedWords";
import { findByTestAttr, checkProps } from "../test/testUtils";


const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};
test("renders without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "");
  expect(component.length).toBe(1);
});
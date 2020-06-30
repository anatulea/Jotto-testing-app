import React from "react";
import Input from "./Input";
import { shallow } from "enzyme";

import { findByTestAttr } from "../test/testUtils";

const setup = (props = {}) => {
  return shallow(<Input />);
};
test("Input renders without error", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});
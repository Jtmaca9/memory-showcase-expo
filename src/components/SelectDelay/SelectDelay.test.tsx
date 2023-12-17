import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SelectDelay from "./SelectDelay";

describe("SelectDelay", () => {
  it("should call setDelay with correct value on button press", () => {
    const setDelay = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SelectDelay delay={0} setDelay={setDelay} />
    );

    const input = getByPlaceholderText("Enter image delay in seconds..");
    fireEvent.changeText(input, "5");

    const button = getByText("Showcase");
    fireEvent.press(button);

    expect(setDelay).toHaveBeenCalledWith(5000);
  });

  it("should not call setDelay and show error if input is a negative number", () => {
    const setDelay = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SelectDelay delay={0} setDelay={setDelay} />
    );

    const input = getByPlaceholderText("Enter image delay in seconds..");
    fireEvent.changeText(input, "-5");

    const button = getByText("Showcase");
    fireEvent.press(button);

    expect(setDelay).not.toHaveBeenCalled();
    expect(getByText("Delay must be a valid number")).toBeTruthy();
  });

  it("should not call setDelay and show error if input contains string characters", () => {
    const setDelay = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SelectDelay delay={0} setDelay={setDelay} />
    );

    const input = getByPlaceholderText("Enter image delay in seconds..");
    fireEvent.changeText(input, "abc");

    const button = getByText("Showcase");
    fireEvent.press(button);

    expect(setDelay).not.toHaveBeenCalled();
    expect(getByText("Delay must be a valid number")).toBeTruthy();
  });
});

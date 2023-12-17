import React from "react";
import { render } from "@testing-library/react-native";
import Memory from "./Memory";

describe("Memory", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<Memory imageURL="testImage" tiltRight />);

    const memory = getByTestId("memory");

    expect(memory).toBeTruthy();
  });

  it("should set image source correctly", () => {
    const { getByTestId } = render(<Memory imageURL="testImage" tiltRight />);

    const image =
      getByTestId("memory").props.children.props.children.props.source;

    expect(image).toBe("testImage");
  });
});

import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import Showcase from "./Showcase";

describe("Showcase", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <Showcase
        images={[]}
        title="Test Showcase"
        goBack={jest.fn()}
        delay={1000}
      />
    );

    const title = getByText("Test Showcase");

    expect(title).toBeTruthy();
  });

  it("should call goBack when title container is pressed", () => {
    const goBack = jest.fn();
    const { getByText } = render(
      <Showcase
        images={[]}
        title="Test Showcase"
        goBack={goBack}
        delay={1000}
      />
    );

    const titleContainer = getByText("Test Showcase");
    fireEvent.press(titleContainer);

    expect(goBack).toHaveBeenCalled();
  });

  it("should render Memory component correctly with given images and delay", async () => {
    const images = ["image1", "image2"];
    const { findAllByTestId } = render(
      <Showcase
        images={images}
        title="Test Showcase"
        goBack={jest.fn()}
        delay={1000}
      />
    );

    await waitFor(
      async () => {
        const memories = await findAllByTestId("memory");
        expect(memories.length).toBe(2);
      },
      { timeout: 3000 }
    ); // timeout should be greater than total delay
  });
});

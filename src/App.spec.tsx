import "react-native";
import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

jest.useFakeTimers();
describe("App", () => {
  it("renders correctly", () => {
    const app = renderer.create(<App />).toJSON();
    expect(app).toMatchSnapshot();
  });
});

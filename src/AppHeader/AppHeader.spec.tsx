import React from "react";
import AppHeader from "./AppHeader";
import renderer from "react-test-renderer";

describe("Header", () => {
  it("should render as expected", () => {
    const header = renderer.create(<AppHeader title="Test" />).toJSON;
    expect(header).toMatchSnapshot();
  });
});

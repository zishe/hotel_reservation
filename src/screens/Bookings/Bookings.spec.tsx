import React from "react";
import Bookings from "./Bookings";
import renderer from "react-test-renderer";

describe("Bookings", () => {
  it("should render as expected", () => {
    const navigation = {};
    const bookings = renderer.create(<Bookings navigation={navigation} />)
      .toJSON;
    expect(bookings).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import Booking from "./Booking";

const reservation = {
  id: "1",
  name: "TestName",
  hotelName: "TestHotel",
  arrivalDate: "03/09/2019",
  departureDate: "03/16/2019"
};

const mockProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn().mockReturnValue(reservation)
  },
  ...props
});

describe("BookingsScreen", () => {
  /**
   * @description test component renders
   */
  it("should render as expected", () => {
    const props = mockProps({});
    const booking = renderer.create(<Booking {...props} />).toJSON;
    expect(booking).toMatchSnapshot();
  });
});

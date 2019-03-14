import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import wait from "waait";

import Bookings from "./Bookings";
import { GET_BOOKINGS_QUERY } from "../../graphql/queries/getBookings";

const testProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

// mock query for valid data/response
const bookingsQueryMock: any = {
  request: {
    query: GET_BOOKINGS_QUERY
  },
  result: {
    data: {
      reservations: [
        {
          id: "Test-1",
          name: "TestName",
          hotelName: "TestHotel",
          arrivalDate: "03/09/2019",
          departureDate: "03/16/2019"
        }
      ]
    }
  }
};

// mock query for error response
const bookingsQueryErrorMock: any = {
  request: {
    query: GET_BOOKINGS_QUERY
  },
  error: {
    message: "TestError"
  }
};

describe("BookingsScreen", () => {
  let props: any;
  beforeEach(() => {
    props = testProps({});
  });

  /**
   * @description test component renders
   */
  it("should render as expected", () => {
    const navigation = {};
    const bookings = renderer.create(
      <MockedProvider mocks={[]}>
        <Bookings navigation={navigation} />
      </MockedProvider>
    ).toJSON;
    expect(bookings).toMatchSnapshot();
  });

  /**
   * @description test loading state
   */
  it("should render loading state initially", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[]}>
        <Bookings {...props} />
      </MockedProvider>
    );
    const activityIndicator = bookings.root.findAll(
      el =>
        el.type === "ActivityIndicator" &&
        el.props.testID === "activityIndicator"
    );
    expect(activityIndicator).toHaveLength(1);
  });

  /**
   * @description test for valid data
   */
  it("should render data correctly", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );

    await wait(0); // wait for response

    const dataNode = bookings.root.findAll(
      el =>
        el.type === "Text" &&
        el.children &&
        el.children[0] === bookingsQueryMock.result.data.reservations[0].name
    );
    expect(dataNode).toHaveLength(1);
  });

  /**
   * @description test for error condition
   */
  it("should render error correctly", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[bookingsQueryErrorMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );

    await wait(0); // wait for response
    const errorNode = bookings.root.findAll(
      el =>
        el.type === "Text" &&
        el.children &&
        el.children[0].toString().indexOf("TestError") > -1
    );
    expect(errorNode).toHaveLength(1);
  });

  /**
   * @description test reservation ListItem onPress
   */
  it("should call navigation.navigate when a reservation item is pressed", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );
    await wait(0); // wait for response
    const reservationListItem = bookings.root.find(
      el => el.props.testID === "Test-1"
    );

    reservationListItem.props.onPress();
    const reservation = bookingsQueryMock.result.data.reservations[0];
    expect(props.navigation.navigate).toHaveBeenCalledWith("Booking", {
      reservation,
      navigation: props.navigation
    });
  });
});

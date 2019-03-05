import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { ActivityIndicator } from "react-native";
import wait from "waait";
import { Text } from "react-native";

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
          id: "1",
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
  let props: any; // use type "any" to opt-out of type-checking
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
    const bookingsWrapper = mount(
      <MockedProvider mocks={[]}>
        <Bookings {...props} />
      </MockedProvider>
    );

    expect(
      bookingsWrapper.contains(
        <ActivityIndicator size="large" color="#00ff00" />
      )
    ).toBeTruthy();
  });

  /**
   * @description test for valid data
   */
  it("should render data correctly", async () => {
    const bookingsWrapper = mount(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );

    await wait(0); // wait for response
    bookingsWrapper.update();
    expect(bookingsWrapper.contains(<Text>TestName</Text>)).toBeTruthy();
  });

  /**
   * @description test for error condition
   */
  it("should render error correctly", async () => {
    const bookingsWrapper = mount(
      <MockedProvider mocks={[bookingsQueryErrorMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );

    await wait(0); // wait for response
    bookingsWrapper.update();
    expect(
      bookingsWrapper.contains(<Text>Network error: TestError</Text>)
    ).toBeTruthy();
  });
});

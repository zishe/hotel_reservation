import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import wait from "waait";
import Bookings from "./Bookings";
import { GET_BOOKINGS_QUERY } from "../../graphql/queries/getBookings";

// mocked Apollo Client
const mockApolloClient = {
  query: jest.fn().mockImplementation(() => {
    return {
      data: { selectedReservationId: "Test-1" }
    };
  })
};

// mocked react-navigation
const navigation: any = {
  navigate: jest.fn(),
  events: {} as any
};
navigation.addListener = jest
  .fn()
  .mockImplementation((evnt: string, fn: any) => {
    navigation.events[evnt] = fn;
    return {
      remove: jest.fn()
    };
  });

const testProps = (props: Object) => ({
  navigation,
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

// Unit tests for Bookings screen
describe("BookingsScreen", () => {
  let props: any;
  beforeEach(() => {
    props = testProps({});
  });

  // /**
  //  * @description test component renders
  //  */
  it("should render as expected", () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[]}>
        <Bookings {...props} />
      </MockedProvider>
    ).toJSON;
    expect(bookings).toMatchSnapshot();
  });

  it("should call navigation addListner to subscribe to didFocus event", () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[]}>
        <Bookings {...props} apolloClient={mockApolloClient} />
      </MockedProvider>
    );
    props.navigation.events.didFocus();
    expect(props.navigation.addListener).toHaveBeenCalled();
    bookings.unmount();
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

  /**
   * @description test reservation ListItem onPress
   */
  it("should call navigation.navigate to Make reservation when FAB pressed", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} />
      </MockedProvider>
    );
    await wait(0); // wait for response
    const fabButton = bookings.root.find(el => el.props.testID === "Fab");

    fabButton.props.onPress();
    expect(props.navigation.navigate).toHaveBeenCalledWith("MakeReservation");
  });

  /**
   * @description test reservation ListItem onPress
   */
  it("should scroll to selected reservation list item when updated", async () => {
    const bookings = renderer.create(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} apolloClient={mockApolloClient} />
      </MockedProvider>
    );
    await wait(0); // wait for response

    // simulate onPress of an Item
    const reservationListItem = bookings.root.find(
      el => el.props.testID === "Test-1"
    );
    reservationListItem.props.onPress();

    // simulate screen focus
    props.navigation.events.didFocus();
    await wait(0);

    // simulate update component to trigger scroll to
    bookings.update(
      <MockedProvider mocks={[bookingsQueryMock]} addTypename={false}>
        <Bookings {...props} apolloClient={mockApolloClient} />
      </MockedProvider>
    );
    await wait(200); // wait for setTimeout set for scroll to item
    expect(bookings).toMatchSnapshot();
  });
});

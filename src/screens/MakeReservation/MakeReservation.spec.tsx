import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";

import MakeReservation from "./MakeReservation";
import { CREATE_RESERVATION_MUTATION } from "../../graphql/mutations/createReservation";

const mockProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn()
  },
  ...props
});

const mockReservation = {
  name: "TestName",
  arrivalDate: "03/20/2019",
  hotelName: "TestHotelName",
  departureDate: "03/22/2019"
};

// mock query for valid data/response
const mockReservationMutation = {
  request: {
    query: CREATE_RESERVATION_MUTATION,
    variables: { ...mockReservation }
  },
  result: {
    data: {
      createReservation: { ...mockReservation, id: "Test-1" }
    }
  }
};

// mock query for error response
// const mockReservationMutationError: any = {
//   request: {
//     mutation: CREATE_RESERVATION_MUTATION
//   },
//   error: {
//     message: "TestError"
//   }
// };
jest.useFakeTimers();
describe("MakeReservationScreen", () => {
  let props: any;
  beforeEach(() => {
    props = mockProps({});
  });

  /**
   * @description test component renders
   */
  it("should render as expected", () => {
    const bookings = renderer
      .create(
        <MockedProvider mocks={[]}>
          <MakeReservation {...props} />
        </MockedProvider>
      )
      .toJSON();
    expect(bookings).toMatchSnapshot();
  });

  /**
   * @description test for valid data
   */
  it("should show ActivityIndicator on press of submit", async () => {
    const component = renderer.create(
      <MockedProvider mocks={[mockReservationMutation]} addTypename={false}>
        <MakeReservation {...props} />
      </MockedProvider>
    );

    const submitButton = component.root.find(
      el => el.props.testID === "SubmitButton"
    );
    submitButton.props.onPress();

    const activityIndicator = component.root.findAll(
      (el: any) =>
        el.type === "ActivityIndicator" &&
        el.props.testID === "activityIndicator"
    );
    expect(activityIndicator).toHaveLength(1);
  });

  /**
   * @description test for valid data
   * @seems some issue with the Mutation unit testing
   * GitHub issue to be logged
   * https://medium.com/hotel-reservation-app/initialize-project-c19f57ff2e7e/#fbab
   */
  //   it("should call createReservation mutation on press of submit", async () => {
  //     props = mockProps({});
  //     const component = renderer.create(
  //       <MockedProvider mocks={[mockReservationMutation]} addTypename={false}>
  //         <MakeReservationScreen {...props} />
  //       </MockedProvider>
  //     );

  //     // const instance = component.root.instance;

  //     // instance.setState({
  //     //   name: "1",
  //     //   hotelName: "1",
  //     //   arrivalDate: "03/21/2019",
  //     //   departureDate: "03/22/2019"
  //     // });
  //     // component.root
  //     //   .find(el => el.props.testID === "arrivalDate")
  //     //   .props.onDateChange(mockReservation.arrivalDate);

  //     await wait(0); // wait for response
  //     expect(props.navigation.navigate).toBeCalled();
  //   });
});

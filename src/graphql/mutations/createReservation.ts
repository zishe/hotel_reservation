import { gql } from "apollo-boost";

export const CREATE_RESERVATION_MUTATION = gql`
  mutation CreateReservation(
    $name: String!
    $hotelName: String!
    $arrivalDate: String!
    $departureDate: String!
  ) {
    createReservation(
      data: {
        name: $name
        hotelName: $hotelName
        arrivalDate: $arrivalDate
        departureDate: $departureDate
      }
    ) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

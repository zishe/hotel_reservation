import { gql } from "apollo-boost";

export const GET_BOOKINGS_QUERY = gql`
  query GetBookingsQuery {
    reservations {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

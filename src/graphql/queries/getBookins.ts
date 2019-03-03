import { gql } from "apollo-boost";

export const getBookingsQuery = gql`
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

// class GetBookingsQuery extends Query<Data, Variables> {}

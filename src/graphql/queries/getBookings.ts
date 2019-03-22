import { gql } from "apollo-boost";

export const GET_BOOKINGS_QUERY = gql`
  query GetBookingsQuery($first: Int) {
    reservations(first: $first) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

export const GET_RESERVATIONS_CONNECTION = gql`
  query GetReservationsConnection($first: Int, $cursor: String) {
    reservationsConnection(first: $first, after: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          arrivalDate
          departureDate
          name
          hotelName
        }
      }
      aggregate {
        count
      }
    }
  }
`;

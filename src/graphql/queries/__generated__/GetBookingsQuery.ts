/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBookingsQuery
// ====================================================

export interface GetBookingsQuery_reservations {
  __typename: "Reservation";
  id: string;
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

export interface GetBookingsQuery {
  reservations: (GetBookingsQuery_reservations | null)[];
}

export interface GetBookingsQueryVariables {
  first?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateReservation
// ====================================================

export interface CreateReservation_createReservation {
  __typename: "Reservation";
  id: string;
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

export interface CreateReservation {
  createReservation: CreateReservation_createReservation;
}

export interface CreateReservationVariables {
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

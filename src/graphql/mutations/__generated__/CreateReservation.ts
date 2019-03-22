import { Reservation } from "../../commonGeneratedTypes";

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateReservation
// ====================================================

export interface CreateReservationMutation {
  createReservation: Reservation;
}

export interface CreateReservationVariables {
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

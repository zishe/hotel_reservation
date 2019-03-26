import { gql } from "apollo-boost";

export const SELECTED_RESERVATION_ID = {
  query: gql`
    {
      selectedReservationId @client
    }
  `
};

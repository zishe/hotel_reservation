/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReservationsConnection
// ====================================================

export interface GetReservationsConnection_reservationsConnection_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface GetReservationsConnection_reservationsConnection_edges_node {
  __typename: "Reservation";
  id: string;
  arrivalDate: string;
  departureDate: string;
  name: string;
  hotelName: string;
}

export interface GetReservationsConnection_reservationsConnection_edges {
  __typename: "ReservationEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetReservationsConnection_reservationsConnection_edges_node;
}

export interface GetReservationsConnection_reservationsConnection_aggregate {
  __typename: "AggregateReservation";
  count: number;
}

export interface GetReservationsConnection_reservationsConnection {
  __typename: "ReservationConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetReservationsConnection_reservationsConnection_pageInfo;
  /**
   * A list of edges.
   */
  edges: (GetReservationsConnection_reservationsConnection_edges | null)[];
  aggregate: GetReservationsConnection_reservationsConnection_aggregate;
}

export interface GetReservationsConnection {
  reservationsConnection: GetReservationsConnection_reservationsConnection;
}

export interface GetReservationsConnectionVariables {
  first?: number | null;
  cursor?: string | null;
}

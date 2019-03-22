export interface Reservation {
  __typename: "Reservation";
  id: string;
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
}

export interface ReservationsConnectionVariables {
  first?: number | null;
  cursor?: string | null;
}

export interface ReservationsConnectionQuery {
  reservationsConnection: ReservationsConnection;
}

export interface ReservationsConnection {
  __typename: "ReservationConnection";
  pageInfo: ReservationsConnectionPageInfo;
  edges: (ReservationsConnectionNode | null)[];
  aggregate?: ReservationsConnectionAggregate;
}

export interface ReservationsConnectionPageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ReservationsConnectionNode {
  __typename: "ReservationEdge";
  node: Reservation;
}

export interface ReservationsConnectionAggregate {
  __typename: "AggregateReservation";
  count: number;
}

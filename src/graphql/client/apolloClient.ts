import ApolloClient from "apollo-boost";

export const clientState = {
  defaults: {
    selectedReservationId: ""
  },
  resolvers: {},
  typeDefs: `
    type Query {
        selectedReservationId: String
    }
  `
};

export const apolloClient = new ApolloClient({
  uri:
    "https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev",
  clientState
});

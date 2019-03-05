import React, { Component } from "react";
import { AppNavigationContainer } from "./routes/AppStackNavigator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const apolloClient = new ApolloClient({
  uri: "https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev"
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <AppNavigationContainer />
      </ApolloProvider>
    );
  }
}

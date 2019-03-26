import React, { Component } from "react";
import { AppNavigationContainer } from "./routes/AppStackNavigator";
import { ApolloProvider } from "react-apollo";
import { Root } from "native-base";
import { apolloClient } from "./graphql/client/apolloClient";

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Root>
          <AppNavigationContainer />
        </Root>
      </ApolloProvider>
    );
  }
}

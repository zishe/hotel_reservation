import React from "react";
import { View, ActivityIndicator, FlatList, Text } from "react-native";
import {
  Container,
  Text as TextNB,
  Content,
  Right,
  Card,
  CardItem,
  Body,
  Icon
} from "native-base";
import styles from "./styles";
import { format } from "date-fns";
import { AppHeader } from "../../components";
import { Query } from "react-apollo";
import { GET_RESERVATIONS_CONNECTION } from "../../graphql/queries/getBookings";
import {
  Reservation,
  ReservationsConnectionNode,
  ReservationsConnectionQuery
} from "../../graphql/commonGeneratedTypes";

interface Props {
  navigation: any;
}

interface ListItem {
  item: ReservationsConnectionNode;
}
export default class BookingsScreen extends React.PureComponent<Props, {}> {
  static navigationOptions = {
    drawerLabel: "Reservatinos",
    drawerIcon: (): any => <Icon name={"list"} />
  };

  render() {
    return (
      <Query query={GET_RESERVATIONS_CONNECTION} variables={{ first: 9 }}>
        {({ loading, data, error, fetchMore }) =>
          this.renderList(data, loading, error, fetchMore)
        }
      </Query>
    );
  }

  keyExtractor = (item: ReservationsConnectionNode) => item.node.id;
  /**
   * @description render list of reservations
   * @param data graphql query data
   * @param loading loading status from graphql query
   * @param error error from graphql query
   */
  renderList = (
    data: ReservationsConnectionQuery,
    loading: boolean,
    error: any,
    fetchMore: any
  ) => {
    if (loading) {
      return this.renderMessage("loading...");
    }
    if (error) {
      return this.renderMessage(
        error.message || "Error receiving data, please check your network."
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.screenContainer}>
          <AppHeader
            title="Hotel Reservations"
            navigation={this.props.navigation}
          />
          <View style={styles.content}>
            <FlatList
              data={data.reservationsConnection.edges}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderBooking}
              onEndReachedThreshold={1}
              onEndReached={() => {
                fetchMore({
                  variables: {
                    first: 9,
                    cursor: data.reservationsConnection.pageInfo.endCursor
                  },
                  updateQuery: this.fetchMoreResults
                });
              }}
            />
          </View>
        </Content>
      </Container>
    );
  };

  /**
   * @description displays one reservation row/item
   * @param item reservation object
   */
  renderBooking = (listItem: ListItem) => {
    const reservationNode = listItem.item.node;

    return (
      <Card style={{ flex: 1 }}>
        <CardItem
          button
          testID={reservationNode.id}
          onPress={() => this.showBooking(reservationNode)}
        >
          <Body style={styles.cardBody}>
            <Text>{reservationNode.name}</Text>
            <TextNB note>{reservationNode.id}</TextNB>
            <Text style={styles.hightlightedNote}>
              {format(reservationNode.arrivalDate, "MM/DD/YYYY")} -{" "}
              {format(reservationNode.departureDate, "MM/DD/YYYY")}
            </Text>
          </Body>
          <Right style={styles.cardRight}>
            <Text style={styles.hightlightedText}>
              {reservationNode.hotelName}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  };

  /**
   * @description callback function for onPress of a reservation in the list
   *  navigates to Booking Details screen
   */
  showBooking = (reservation: Reservation) => {
    this.props.navigation.navigate("Booking", {
      reservation,
      navigation: this.props.navigation
    });
  };

  /**
   * @description displays a message in the view's content area
   * @param message message to display
   */
  renderMessage = (message: string) => {
    return (
      <Container>
        <Content contentContainerStyle={styles.screenContainer}>
          <AppHeader title="Hotel Reservations" />
          <View style={styles.content}>
            {message.indexOf("loading") === 0 ? (
              <ActivityIndicator
                size="large"
                color="#00ff00"
                testID="activityIndicator"
              />
            ) : (
              <Text>{message}</Text>
            )}
          </View>
        </Content>
      </Container>
    );
  };

  /**
   * @name fetchMoreResults
   * @param previousResult set of results fetuched in previous fetchMore call
   * @param newResults set of results fetuched in in current fetchMore call
   * @memberof BookingsScreen
   */
  fetchMoreResults = (
    previousResult: ReservationsConnectionQuery,
    newResults: any
  ) => {
    const newEdges = newResults.fetchMoreResult.reservationsConnection.edges;
    const pageInfo = newResults.fetchMoreResult.reservationsConnection.pageInfo;
    const previousEdges = previousResult.reservationsConnection.edges;

    const aggregate = {
      __typename: previousResult.reservationsConnection.aggregate.__typename,
      count:
        previousResult.reservationsConnection.aggregate.count +
        newResults.fetchMoreResult.reservationsConnection.aggregate.count
    };

    const uniqueEdges = newEdges.filter((node: ReservationsConnectionNode) => {
      const duplicateItems = previousEdges.filter(
        (pnode: ReservationsConnectionNode) => pnode.node.id === node.node.id
      );
      return duplicateItems.length < 1;
    });

    return newEdges.length
      ? {
          reservationsConnection: {
            __typename: previousResult.reservationsConnection.__typename,
            edges: [...previousEdges, ...uniqueEdges],
            pageInfo,
            aggregate
          }
        }
      : previousResult;
  };
}

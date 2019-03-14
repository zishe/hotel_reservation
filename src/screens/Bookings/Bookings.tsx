import React from "react";
import { View, ActivityIndicator, FlatList, Text } from "react-native";
import {
  Container,
  Text as TextNB,
  Content,
  Right,
  Card,
  CardItem,
  Body
} from "native-base";
import styles from "./styles";
import { AppHeader } from "../../components";
import { Query } from "react-apollo";
import { GET_BOOKINGS_QUERY } from "../../graphql/queries/getBookings";

import {
  GetBookingsQuery,
  Reservation
} from "../../graphql/queries/__generated__/GetBookingsQuery";

interface Props {
  navigation: any;
}

export default class BookingsScreen extends React.PureComponent<Props, {}> {
  static navigationOptions = {
    drawerLabel: "Reservatinos",
    drawerIcon: (): any => null
  };

  render() {
    return (
      <Query query={GET_BOOKINGS_QUERY}>
        {({ loading, data, error }) => this.renderList(data, loading, error)}
      </Query>
    );
  }

  keyExtractor = (item: Reservation) => item.id;

  /**
   * @description render list of reservations
   * @param data graphql query data
   * @param loading loading status from graphql query
   * @param error error from graphql query
   */
  renderList = (data: GetBookingsQuery, loading: boolean, error: any) => {
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
              data={data.reservations}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderBooking}
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
  renderBooking = ({ item: reservation }: any) => {
    return (
      <Card style={{ flex: 1 }}>
        <CardItem
          button
          testID={reservation.id}
          onPress={() => this.showBooking(reservation)}
        >
          <Body style={styles.cardBody}>
            <Text>{reservation.name}</Text>
            <TextNB note>{reservation.id}</TextNB>
            <Text style={styles.hightlightedNote}>
              {reservation.arrivalDate} - {reservation.departureDate}
            </Text>
          </Body>
          <Right style={styles.cardRight}>
            <Text style={styles.hightlightedText}>{reservation.hotelName}</Text>
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
}

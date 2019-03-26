import React from "react";
import { View, ActivityIndicator, FlatList, Text } from "react-native";
import {
  Container,
  Content,
  Icon,
  CardItem,
  Body,
  Text as TextNB,
  Right,
  Fab
} from "native-base";
import styles from "./styles";
import { AppHeader } from "../../components";
import { Query } from "react-apollo";
import { GET_BOOKINGS_QUERY } from "../../graphql/queries/getBookings";

import { GetBookingsQuery } from "../../graphql/queries/__generated__/GetBookingsQuery";
import { Reservation } from "../../graphql/commonGeneratedTypes";
import { apolloClient } from "../../graphql/client/apolloClient";
import { SELECTED_RESERVATION_ID } from "../../graphql/client/queries/selectedReservation";
import { format } from "date-fns";

interface Props {
  navigation: any;
}

interface State {
  selectedReservationId: string;
}

export default class BookingsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    drawerLabel: "Reservatinos",
    drawerIcon: (): any => <Icon name={"list"} />
  };

  state: State = {
    selectedReservationId: ""
  };

  private screenFocusSubscription: any = null;
  private flatListRef: any = null;
  private reservations: Reservation[] = [];

  // subscribe to 'didFocus' event of react-navigation
  // whenever user lands on this screen, get the last selected reservation
  subscribeToDidFocus = () => {
    this.screenFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        const { data } = await apolloClient.query(SELECTED_RESERVATION_ID);
        this.setState({ selectedReservationId: data.selectedReservationId });
      }
    );
  };

  // subscribe didFocus event
  componentDidMount() {
    this.subscribeToDidFocus();
  }

  componentDidUpdate() {
    this.scrollToItem();
  }

  // unsubscribe didFocus event
  componentWillUnmount() {
    this.screenFocusSubscription.remove();
  }

  /**
   * @name scrollToItem
   * @description scroll to the reservation
   *              last selected by user or any new reservation made
   * @memberof BookingsScreen
   */
  scrollToItem = async () => {
    if (this.state.selectedReservationId) {
      setTimeout(() => this.flatListRef.scrollToEnd(), 10);
      const item = this.reservations.find(
        res => res.id === this.state.selectedReservationId
      );
      if (item) {
        setTimeout(() => {
          this.flatListRef.scrollToItem({ animated: true, item });
        }, 100);
      }
    }
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
    this.reservations = data.reservations;
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
              ref={ref => {
                this.flatListRef = ref;
              }}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderBooking}
              extraData={this.state.selectedReservationId}
              testID="FlatListID"
            />
          </View>
        </Content>
        {this.renderFab()}
      </Container>
    );
  };

  /**
   * @description displays one reservation row/item
   * @param item reservation object
   */
  renderBooking = ({ item: reservation }: any) => {
    const borderColor =
      reservation.id === this.state.selectedReservationId ? "green" : "#eee";
    return (
      <View style={[styles.card, { borderColor }]}>
        <CardItem
          button
          testID={reservation.id}
          onPress={() => this.showBooking(reservation)}
        >
          <Body style={styles.cardBody}>
            <Text>{reservation.name}</Text>
            <TextNB note>{reservation.id}</TextNB>
            <Text style={styles.hightlightedNote}>
              {format(reservation.arrivalDate, "MM/DD/YYYY")} -{" "}
              {format(reservation.departureDate, "MM/DD/YYYY")}
            </Text>
          </Body>
          <Right style={styles.cardRight}>
            <Text style={styles.hightlightedText}>{reservation.hotelName}</Text>
          </Right>
        </CardItem>
      </View>
    );
  };

  /**
   * @description callback function for onPress of a reservation in the list
   *  navigates to Booking Details screen
   */
  showBooking = (reservation: Reservation) => {
    // set selected reservation as client state to highlight the selected Reservation
    apolloClient.writeData({ data: { selectedReservationId: reservation.id } });
    this.props.navigation.navigate("Booking", {
      reservation,
      navigation: this.props.navigation
    });
  };

  /**
   * @name renderFab
   * @description render Fab button on bottom right
   */
  renderFab = () => (
    <Fab
      active
      direction="up"
      containerStyle={{}}
      style={{ backgroundColor: "#5067FF" }}
      position="bottomRight"
      onPress={this.onFabPress}
      testID="Fab"
    >
      <Icon name="add" style={{ fontSize: 30 }} />
    </Fab>
  );

  /**
   * @name onFabClick
   * @description callback for Fab button onPress event
   */
  onFabPress = () => {
    this.props.navigation.navigate("MakeReservation");
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

import React from "react";
import { Text } from "react-native";
import { Container, Content, Body, ListItem, List, Left } from "native-base";
import { AppHeader } from "../../components";
import styles from "./styles";

interface Props {
  navigation: any;
}

export default class BookingScreen extends React.PureComponent<Props, {}> {
  static navigationOptions = {
    drawerLabel: (): any => null
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.screenContainer}>
          <AppHeader
            title="Reservation Details"
            backScreen="Bookings"
            navigation={this.props.navigation}
          />
          <List>{this.renderDetails()}</List>
        </Content>
      </Container>
    );
  }

  renderDetails = () => {
    const reservation: any = this.props.navigation.getParam("reservation", {});

    const fields = [
      { label: "Reservation Id", prop: "id" },
      { label: "Guest Name", prop: "name" },
      { label: "Hotel", prop: "hotelName" },
      { label: "Arrival", prop: "arrivalDate" },
      { label: "Departure", prop: "departureDate" }
    ];

    return fields.map(field => {
      return this.renderDetailsItem(field.label, reservation[field.prop]);
    });
  };

  renderDetailsItem = (label: string, val: string) => {
    const itemKey = `reservationdetails-${label}-${val}`;
    return (
      <ListItem key={itemKey}>
        <Left>
          <Text>{label}:</Text>
        </Left>
        <Body>
          <Text>{val}</Text>
        </Body>
      </ListItem>
    );
  };
}

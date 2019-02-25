import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";
import styles from "./styles";
import { AppHeader } from "../../components";

interface Props {
  navigation: any;
}

class BookingsScreen extends Component<Props, {}> {
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.screenContainer}>
          <AppHeader title="Hotel Reservations" />

          <View style={styles.content}>
            <List>
              <ListItem>
                <Text>Tom Cruise</Text>
              </ListItem>
              <ListItem>
                <Text>Johnny Depp</Text>
              </ListItem>
              <ListItem>
                <Text>Tom Hanks</Text>
              </ListItem>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default BookingsScreen;

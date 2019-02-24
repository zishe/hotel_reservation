import React, { Component } from "react";
import { Header, Left, Title, Right, Text, Body, Icon } from "native-base";
import styles from "./AppHeader.styles";

interface Props {
  title: string;
}

class AppHeader extends Component<Props, {}> {
  render() {
    return (
      <Header
        style={styles.headerBar}
        iosBarStyle="dark-content"
        androidStatusBarColor="lightgray"
      >
        <Left style={{ flex: 2 }}>
          <Icon name="contact" style={styles.icon} />
        </Left>

        <Body style={styles.body}>
          <Title style={styles.titleText}>{this.props.title}</Title>
        </Body>

        <Right style={{ flex: 2 }}>
          <Icon name="menu" style={styles.icon} />
        </Right>
      </Header>
    );
  }
}

export default AppHeader;

import React, { Component } from "react";
import { Header, Left, Title, Right, Body, Icon } from "native-base";
import styles from "./styles";

interface Props {
  title: string;
  backScreen?: string;
  navigation?: any;
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
          <Icon
            name="menu"
            testID="menu"
            style={styles.icon}
            onPress={this.onOptionsPress}
          />
        </Left>

        <Body style={styles.body}>
          <Title style={styles.titleText}>{this.props.title}</Title>
        </Body>

        <Right style={{ flex: 2 }}>{this.renderRightIcon()}</Right>
      </Header>
    );
  }
  /**
   * @name renderLeftIcon
   * @description render the left-side icon
   */
  renderRightIcon = () => {
    if (this.props.backScreen) {
      return (
        <Icon
          name="close"
          style={styles.icon}
          testID="close"
          onPress={this.onBackPress}
        />
      );
    }

    return <Icon name="contact" testID="contact" style={styles.icon} />;
  };

  /**
   * @name onBackPress
   * @description function to call on press of back icon
   */
  onBackPress = () => {
    this.props.navigation.navigate(this.props.backScreen);
  };

  /**
   * @name onOptionsPress
   * @description function to toggle side menu drawer
   */
  onOptionsPress = () => {
    this.props.navigation.toggleDrawer();
  };
}

export default AppHeader;

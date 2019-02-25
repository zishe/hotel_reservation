import { createStackNavigator, createAppContainer } from "react-navigation";
import { Bookings } from "../screens";

const AppStackNavigator = createStackNavigator(
  {
    Bookings: { screen: Bookings }
  },
  {
    initialRouteName: "Bookings",
    headerMode: "none"
  }
);

export const AppNavigationContainer = <any>(
  createAppContainer(AppStackNavigator)
);

import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { BookingsScreen, BookingScreen } from "../screens";

const AppStackNavigator = createDrawerNavigator(
  {
    Bookings: { screen: BookingsScreen },
    Booking: { screen: BookingScreen }
  },
  {
    initialRouteName: "Bookings"
  }
);

export const AppNavigationContainer = <any>(
  createAppContainer(AppStackNavigator)
);

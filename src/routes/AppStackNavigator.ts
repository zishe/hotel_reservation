import { createDrawerNavigator, createAppContainer } from "react-navigation";
import {
  BookingsScreen,
  BookingScreen,
  MakeReservationScreen
} from "../screens";

const AppStackNavigator = createDrawerNavigator(
  {
    Bookings: { screen: BookingsScreen },
    Booking: { screen: BookingScreen },
    MakeReservation: { screen: MakeReservationScreen }
  },
  {
    initialRouteName: "MakeReservation"
  }
);

export const AppNavigationContainer = <any>(
  createAppContainer(AppStackNavigator)
);

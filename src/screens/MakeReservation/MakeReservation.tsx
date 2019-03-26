import React from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import {
  Container,
  Button,
  Content,
  Icon,
  DatePicker,
  Toast
} from "native-base";
import { Mutation } from "react-apollo";
import { format, addDays } from "date-fns";
import { CREATE_RESERVATION_MUTATION } from "../../graphql/mutations/createReservation";
import { AppHeader } from "../../components";
import styles from "./styles";
import { SELECTED_RESERVATION_ID } from "../../graphql/client/queries/selectedReservation";

interface Props {
  navigation: any;
}

interface State {
  name: string;
  hotelName: string;
  arrivalDate: string | Date;
  departureDate: string | Date;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "date";
}

const formFields: FormField[] = [
  { name: "name", label: "Guest Name", type: "text" },
  { name: "hotelName", label: "Hotel Name", type: "text" },
  { name: "arrivalDate", label: "Arrival Date", type: "date" },
  { name: "departureDate", label: "Departure Date", type: "date" }
];

/**
 * @export
 * @class MakeReservation
 * @extends {React.PureComponent<Props, State>}
 */
export default class MakeReservation extends React.PureComponent<Props, State> {
  static navigationOptions = {
    drawerLabel: "Make New Reservation",
    drawerIcon: (): any => <Icon name="add" />
  };

  state: State = {
    name: "",
    hotelName: "",
    arrivalDate: new Date(),
    departureDate: addDays(new Date(), 1)
  };

  screenFocusSubscription: any = null;

  // subscribe to 'didFocus' event of react-navigation
  // whenever user lands on this screen, set the initial state
  subscribeToDidFocus = () => {
    this.screenFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.initializeState();
      }
    );
  };

  // subscribe didFocus event
  componentWillMount() {
    this.subscribeToDidFocus();
  }

  // unsubscribe(remove) didFocus event
  componentWillUnmount() {
    this.screenFocusSubscription.remove();
  }

  /**
   * @name initializeState
   */
  initializeState = () => {
    this.setState({
      name: "",
      hotelName: "",
      arrivalDate: new Date(),
      departureDate: addDays(new Date(), 1)
    });
  };

  /**
   * @name render
   * @desc component render method
   */
  render() {
    return (
      <Mutation
        mutation={CREATE_RESERVATION_MUTATION}
        variables={{ ...this.state }}
        update={this.updateStore}
        refetchQueries={[`GetBookingsQuery`]}
        awaitRefetchQueries={true}
      >
        {(createReservation, { loading, error }) =>
          this.renderForm(createReservation, loading, error)
        }
      </Mutation>
    );
  }

  /**
   * @name renderForm
   * @desc renders the form for making a new reservation
   */
  renderForm = (createReservation: any, loading: boolean, error: any) => (
    <Container>
      <AppHeader
        title="Hilton Reservations"
        navigation={this.props.navigation}
      />
      <View style={styles.content}>
        {error && this.onReservationError(error)}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Make New Reservation</Text>
        </View>

        <View style={styles.body}>
          <Content padder contentContainerStyle={styles.contentContainer}>
            {formFields.map(field => this.renderField(field))}
            {this.renderSubmitButton(createReservation, loading)}
          </Content>
        </View>
      </View>
    </Container>
  );

  /**
   * @name renderField
   * @param field: FormField Field object of the element to be rendered
   * @description renders a field of MakeReservation form
   * @memberof MakeReservation
   */
  renderField = (field: FormField) => {
    return (
      <View style={[styles.rowSpan1]} key={field.label}>
        <View>
          <Text>{field.label}</Text>
        </View>
        <View>
          {field.type === "date"
            ? this.renderDatePicker(field)
            : this.renderTextInput(field)}
        </View>
      </View>
    );
  };

  /**
   * @name renderTextInput
   * @param field: FormField Field object of the element to be rendered
   * @description renders a TextInput type field of MakeReservation form
   * @memberof MakeReservation
   */
  renderTextInput = (field: FormField) => {
    return (
      <TextInput
        testID={field.name}
        style={styles.textBox}
        placeholder={field.label}
        value={(this.state as any)[field.name]}
        onChangeText={txt => this.onTextChange(field.name, txt)}
      />
    );
  };

  /**
   * @name renderDatePicker
   * @param field: FormField Field object of the element to be rendered
   * @description renders a DatePicker element
   * @memberof MakeReservation
   */
  renderDatePicker = (field: FormField) => {
    // set default value for arrivalDate=today, departure date = tomorrow
    const defaultDate =
      field.name === "departureDate" ? addDays(new Date(), 1) : new Date();

    return (
      <View style={styles.textBox}>
        <DatePicker
          defaultDate={defaultDate}
          minimumDate={defaultDate}
          maximumDate={new Date(2999, 12, 31)}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          testID={field.name}
          onDateChange={date => this.datePicked(date, field.name)}
          formatChosenDate={(date: string) => format(date, "MM/DD/YYYY")}
          disabled={false}
        />
      </View>
    );
  };

  /**
   * @name datePicked
   * @param date the date returned from DatePicker
   * @description sets the state.arrivalDate to selected date
   * @memberof MakeReservation
   */
  datePicked = (date: string, fieldName: string) =>
    this.setState({ [fieldName]: date } as any);

  /**
   * @name renderSubmitButton
   * @description render Submit button, show a loading spinner with disabled status when query is running
   * @memberof MakeReservation
   */
  renderSubmitButton = (createReservation: any, loading: boolean) => {
    return (
      <View style={[styles.rowSpan1]}>
        <Button
          iconLeft
          full
          style={[styles.button]}
          disabled={loading}
          onPress={createReservation}
          testID="SubmitButton"
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color="#00ff00"
              testID="activityIndicator"
            />
          )}
          <Text style={styles.buttonText}>Make Reservation</Text>
        </Button>
      </View>
    );
  };

  /**
   * @name onReservationError
   * @description callback to show Mutation error
   * @memberof MakeReservation
   */
  onReservationError = (error: any) => {
    this.toastMessage(
      error.message || "Server or Network error, please try again",
      "danger"
    );
  };

  /**
   * @name onTextChange
   * @description function to call onChangeText event of text inputs
   *              to update the corresponding state value
   * @param fieldName name of the input whose text value has been changed
   * @param value value of the input field
   * @memberof MakeReservation
   */
  onTextChange = (fieldName: string, value: string) => {
    this.setState({
      [fieldName]: value.trim()
    } as any);
  };

  /**
   * @name toastMessage
   * @param msg Message to show on toast
   * @memberof MakeReservation
   */
  toastMessage = (message: string, type: any = "success") => {
    return Toast.show({
      text: message,
      type: type,
      buttonText: "Okay",
      position: "top",
      duration: 5000
    });
  };

  /**
   * @name onReservationComplete
   * @description callback for Mutation onComplete
   * @memberof MakeReservation
   */
  onReservationComplete = () => {
    this.toastMessage("Congratulations! Room reserved successfully!");
    this.props.navigation.navigate("Bookings");
  };

  /**
   * @name updateStore
   * @param store - ApolloClient Cache store
   * @param mutationResult - result of the mutation
   * @description, while ApolloClient would auto-update the store cache of reservations
   *               we need to manually update the selectedReservationId to newly added
   *               reservation to higlight it in the list page
   * @memberof MakeReservation
   */
  updateStore = async (store: any, mutationResult: any) => {
    const {
      data: { createReservation }
    } = mutationResult;

    await store.writeQuery({
      query: SELECTED_RESERVATION_ID.query,
      data: { selectedReservationId: createReservation.id }
    });

    this.onReservationComplete();
  };
}

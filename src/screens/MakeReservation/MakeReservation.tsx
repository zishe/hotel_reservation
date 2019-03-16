import React from "react";
import { Text, TextInput, ActivityIndicator, View } from "react-native";
import {
  Container,
  Segment,
  Item,
  Button,
  Content,
  Icon,
  DatePicker
} from "native-base";
import { AppHeader } from "../../components";
import styles from "./styles";

interface Props {
  navigation: any;
  loading: boolean;
}
interface State {
  name: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
  showDatePicker: "a" | "d" | "";
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
    arrivalDate: "",
    departureDate: "",
    showDatePicker: ""
  };

  /**
   * @name render
   * @desc component render method
   */
  render() {
    return (
      <Container>
        <AppHeader title="My Vocabulary" navigation={this.props.navigation} />
        <View style={styles.content}>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderText}>Make New Reservation</Text>
          </View>

          <View style={styles.body}>
            <Content padder contentContainerStyle={styles.contentContainer}>
              {formFields.map(field => this.renderField(field))}
              {this.renderSubmitButton()}
            </Content>
          </View>
        </View>
      </Container>
    );
  }

  /**
   * @name onTextChange
   * @description function to call onChangeText event of text inputs
   *              to update the corresponding state value
   * @param fieldName name of the input whose text value has been changed
   * @param value value of the input field
   */
  onTextChange = (fieldName: string, value: string) => {
    this.setState({
      [fieldName as any]: value.trim()
    });
  };

  /**
   * @name postWord
   * @description function to call onPress of Add Word button of the form
   */
  postWord = () => {
    console.log(`fgsfsdgfdgsgd`);
  };

  /**
   * @name arrivalDatePicked
   * @param date the date returned from DatePicker
   * @description sets the state.arrivalDate to selected date
   * @memberof MakeReservation
   */
  arrivalDatePicked = (date: string) => this.setState({ arrivalDate: date });

  /**
   * @name departureDatePicked
   * @param date the date returned from DatePicker
   * @description sets the state.departureDate to selected date
   * @memberof MakeReservation
   */
  departureDatePicked = (date: string) =>
    this.setState({ departureDate: date });

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
        style={styles.textBox}
        placeholder={field.label}
        value={this.state.hotelName}
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
    return (
      <View style={styles.textBox}>
        <DatePicker
          defaultDate={new Date()}
          minimumDate={new Date()}
          maximumDate={new Date(2999, 12, 31)}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText={field.label}
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          onDateChange={this.arrivalDatePicked}
          disabled={false}
        />
      </View>
    );
  };

  renderSubmitButton = () => {
    return (
      <View style={[styles.rowSpan1]}>
        <Button
          iconLeft
          full
          style={[styles.button]}
          disabled={this.props.loading}
          onPress={this.postWord}
        >
          {this.props.loading ? (
            <ActivityIndicator color="#bc2b78" size="small" />
          ) : null}

          <Text style={styles.buttonText}>Make Reservation</Text>
        </Button>
      </View>
    );
  };
}

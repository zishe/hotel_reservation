import { NativeModules as RNNativeModules } from "react-native";

const mockUIManager = {
  RCTView: () => ({
    directEventTypes: {}
  })
};

RNNativeModules.UIManager = RNNativeModules.UIManager || mockUIManager;
// RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END" },
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  Directions: {}
};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false
};
RNNativeModules.KeyboardObserver = RNNativeModules.KeyboardObserver || {};

jest.mock("NativeAnimatedHelper");

jest.mock("TextInput", () => {
  const RealComponent = require.requireActual("TextInput");
  const React = require("React");

  class TextInput extends React.Component {
    render() {
      return React.createElement(
        "TextInput",
        { ...this.props, autoFocus: false, blur: false },
        this.props.children
      );
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

// mock DatePicker component from Native-base
jest.mock("DatePickerIOS", () => {
  const RealComponent = require.requireActual("DatePickerIOS");
  const React = require("React");

  class DatePickerIOS extends React.Component {
    render() {
      return React.createElement(
        "DatePickerIOS",
        { ...this.props, setNativeProps: false },
        this.props.children
      );
    }
  }
  DatePickerIOS.propTypes = RealComponent.propTypes;
  return DatePickerIOS;
});

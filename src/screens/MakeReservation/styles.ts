import { StyleSheet, Dimensions } from "react-native";
import RF from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width;

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  subHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbb"
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  body: {
    flex: 9,
    justifyContent: "center"
  },
  subHeaderText: {
    fontSize: RF(3.2),
    color: "#666"
  },
  textBox: {
    marginTop: 9,
    borderColor: "#aaa",
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 4,
    height: 60,
    width: width - 30,
    justifyContent: "center"
  },
  rowSpan1: {
    flex: 2,
    marginTop: 8,
    justifyContent: "center",
    width,
    padding: 15,
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  button: {
    marginTop: 8,
    fontSize: 20,
    borderRadius: 4,
    height: 70
  },
  buttonText: {
    fontSize: RF(3.2),
    color: "#FFF"
  }
});

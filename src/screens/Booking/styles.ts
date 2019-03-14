import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  title: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2
  },
  content: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  cardBody: {
    flex: 8
  },
  cardRight: {
    flex: 2
  },
  hightlightedText: {
    color: "#af2b65"
  },
  hightlightedNote: {
    fontSize: 12,
    color: "blue",
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#dcecf7"
  }
});

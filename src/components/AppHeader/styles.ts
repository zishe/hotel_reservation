import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerBar: {
    backgroundColor: "#104c97",
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 4
  },
  profileImgContainer: {
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 20
  },
  body: {
    flex: 4,
    alignItems: "center"
  },
  titleText: {
    color: "#fff"
  },
  subTitleText: {
    color: "#ddd"
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  icon: {
    color: "#fff",
    padding: 5
  }
});

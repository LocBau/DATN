import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
  },
  containerBg: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "gray",
    alignItems: "center",
    marginHorizontal: 5,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  body: {
    flex: 10,
  },
  bodyAdd: {
    flex: 1,
  },
  bodyAddText1: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,
    color: "white",
  },
  bodyAddText2: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "white",
  },
  bodyDone: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
  },
});
export default styles;

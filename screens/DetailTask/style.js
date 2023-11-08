import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  viewTitleScreen: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  titleScreenText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  viewBody: {
    width: "85%",
  },
  titleTask: {
    color: "blue",
  },
  reminder: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  touchreminder: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  touchlocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueto: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  touchdueto: {
    flexDirection: "row",
    alignItems: "center",
  },
  repeat: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  touchrepeat: {
    flexDirection: "row",
    alignItems: "center",
  },
  attackfile: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  viewAttach: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  touchattach: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteView: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5,
  },

  // keyboardView: {
  //   flex: 1,
  // },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerBottomSheetReminder: {
    flex: 1,
  },
  containerBottomSheetDueTo: {
    flex: 1,
  },
  containerBottomSheetRepeat: {
    flex: 1,
  },
  containerBottomSheetAttach: {
    flex: 1,
  },
});

export default styles;

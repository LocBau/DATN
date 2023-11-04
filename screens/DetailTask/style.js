import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    // justifyContent: "center",
  },
  viewTitleScreen: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  titleScreenText: {
    fontSize: 30,
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
  note: {
    flexDirection: "row",
    width: "100%",
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 20,
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

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 2,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  topLabelRow1: {
    flexDirection: "row",
  },
  topLabelText1: {
    color: "#8040bf",
    fontSize: 40,
    fontWeight: "bold",
  },
  topLabelText2: {
    color: "#272e35",
    fontSize: 40,
    fontWeight: "bold",
  },
  topLabelText3: {
    color: "#272e35",
    fontSize: 20,
    fontWeight: "bold",
  },
  topEmail: {
    marginTop: 5,
    width: "80%",
  },
  emailText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  password: {
    marginTop: 5,
    width: "80%",
  },
  passText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    width: 300,
    paddingLeft: 10,
    marginTop: 5,
    backgroundColor: "#d3b1ffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3b1ff",
  },
  passForgot: {
    fontSize: 15,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: "right",
    color: "#3638dd",
  },

  horizontalLine: {
    marginTop: 50,
    width: "80%",
    borderBottomColor: "purple",
    borderBottomWidth: 1,
  },
  bottomLabelRow1Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#413e54",
    marginTop: 5,
  },
});
export default styles;

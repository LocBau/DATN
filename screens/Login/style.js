import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 2,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 90,
    alignItems: "center",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginTop: 10,
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
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  topEmail: {
    marginBottom: 20,
  },
  emailLabel: {
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
  passLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  passForgot: {
    marginTop: 3,
    fontSize: 15,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: "right",
    color: "#9e9fed",
  },
  loginButton: {
    marginTop: 50,
    height: 40,
    width: 150,
    backgroundColor: "#7a6fbe",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "bold",
  },
  horizontalLine: {
    marginTop: 120,
    width: "80%",
    borderBottomColor: "purple",
    borderBottomWidth: 2,
  },
  bottomLabelRow1Text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#413e54",
    marginTop: 10,
    marginBottom: 30,
  },
  continueButton: {
    marginTop: 10,
    height: 40,
    width: 150,
    backgroundColor: "#7a6fbe",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "bold",
  },
});
export default styles;

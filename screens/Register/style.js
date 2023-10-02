import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    felx: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  titleScreen: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  titleScreenText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topLabelRow1: {
    flexDirection: "row",
    alignItems: "center",
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
  email: {
    marginTop: 30,
    width: "80%",
  },
  emailText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  password: {
    marginTop: 10,
    width: "80%",
  },
  passText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  confirmPassword: {
    marginTop: 10,
    width: "80%",
  },
  confirmPasswordText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    marginTop: 20,
  },
});

export default styles;

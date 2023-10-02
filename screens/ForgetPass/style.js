import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    felx: 1,
    backgroudColor: "red",
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
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  newpass: {
    marginTop: 30,
    width: "80%",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  confirmPassword: {
    marginTop: 5,
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

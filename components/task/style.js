import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(230, 205, 241)",
    width: "auto",
    height: 60,
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  status: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 5,
  },
  contentText1: {
    fontWeight: "bold",
    fontSize: 15,
  },
  contentText2: {
    fontSize: 12,
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;

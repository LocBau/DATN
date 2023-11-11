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
    marginVertical: 5,
    alignItems: "center",
  },
  containerDone: {
    backgroundColor: "rgb(110, 227, 166)",
  },
  status: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 6,
    justifyContent: "space-evenly",
  },
  contentText1: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 2,
  },
  detailContent: {
    flexDirection: "row",
  },
  contentText2: {
    fontSize: 13,
    marginVertical: 2,
  },
  contentText1Done: {
    textDecorationLine: "line-through",
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;

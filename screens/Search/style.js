import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
    // justifyContent: "center",
    // alignItems: "center",
  },
  containerbg: {
    flex: 1,
    marginHorizontal: "auto",
  },
  searchBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 40,
  },
  inputContainer: {
    backgroundColor: "white",
  },
  listresult: {
    marginTop: 120,
  },
});
export default styles;

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  editProfile: {
    flex: 1,
    flexDirection: "row",
  },
  viewAvatar: {
    flex: 1,
    justifyContent: "center",
  },
  viewTextUser: {
    flex: 2,
    justifyContent: "center",
  },
  usersName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
    fontWeight: "80",
  },
  viewButton: {
    flex: 1,
    justifyContent: "center",
  },

  editGroup: {
    flex: 1,
  },
  noti: {
    flex: 2,
  },
  frame: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    width: "90%",
    height: 80,
    backgroundColor: "#efefef",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 25,
      },
    }),
  },
  viewIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewText: {
    flex: 2,
    justifyContent: "center",
  },
  viewSwitch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleFrame: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  frameText: {
    fontSize: 18,

    marginLeft: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
});
export default styles;

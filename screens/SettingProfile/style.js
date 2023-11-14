import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 30,
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
    fontSize: 16,

    color: "blue",
  },
  viewButton: {
    flex: 1,
    justifyContent: "center",
  },
  editCalendar: {
    // flex: 1,
    height: "auto",
  },
  frame: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: "95%",
    height: "auto",
    padding: 3,
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
  viewlistGG: {},
  editGroup: {
    flex: 1,
  },
  noti: {
    flex: 2,
  },
  frameItem: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    width: "95%",
    height: 45,
    backgroundColor: "#efefef",
    borderBottomColor: "purple",
    borderBottomWidth: 1,

    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 3.84,
    //   },
    //   android: {
    //     elevation: 25,
    //   },
    // }),
  },
  viewIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewText: {
    flex: 6,
    justifyContent: "center",
  },
  viewSwitch: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleFrame: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 5,
    marginLeft: 20,
  },
  titleListFrame: {
    fontSize: 16,
    marginBottom: 1,
    marginLeft: 28,
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

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(246, 234, 234)",
    width: "auto",
    height: 40,
    // flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputTask: {
    marginHorizontal: 20,
    width: "70%",
    // height: 40,
    // padding: 5,
  },
  map: {
    width: '70%',
    height: '40%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default styles;

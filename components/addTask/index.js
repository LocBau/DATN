import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import CreateTaskApi from "../../api/createTaskAPi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
const AddTask = (props) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [flag, setFlag] = useState(false);
  const [showDate, setshowDate] = useState(false);
  const [showMap, setModalShowMap] = useState(false);
  const [flag1, setFlag1] = useState(true);
  const [region, setRegion] = useState({
    latitude: 10.861387059389518,
    longitude: 106.7656611593152,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [marker, setMarker] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);

  // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
  const onMapPress = (e) => {
    console.log(e.nativeEvent);
    let m = {
      coordinate: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      key: 0,
    };
    setMarker(m);
  };
  useEffect(() => {
    if (flag1) {
      return;
    }
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      // setRegion(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
      let newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      };
      setFlag1(true);
      setRegion(newRegion);
    };

    // getPermissions();
  });

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setFlag(true);
  };
  const [task, setTask] = useState("");
  const handleAddTask = async () => {
    if (task.length == 0) {
      alert("Please input ....");
      return false;
    }
    let _task = {
      title: task,
      done: false,
      due: flag ? date : null,
      reminder: false,
      repeat: null,
      location: marker
        ? {
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
          }
        : null,
    };
    // let token = await AsyncStorage.getItem('token');
    // let res = await CreateTaskApi(token,task, "description",111,222,undefined);
    // if(!res || res.status !=200) {
    //   alert("failed to add task");
    //   return;
    // }
    // await AsyncStorage.removeItem('flag');
    props.onAddTask(_task);
    console.log(_task);
    setTask("");
    Keyboard.dismiss();
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDate}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setshowDate(!showDate);
        }}
      >
        <View style={styles.centeredView}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            onChange={onChangeDate}
          />
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setshowDate(!showDate)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setshowDate(true)}
      >
        <Text style={styles.textStyle}>Set due</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showMap}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalShowMap(!showMap);
        }}
      >
        <View style={styles.centeredView}>
          <MapView
            region={region}
            onPress={(e) => onMapPress(e)}
            style={styles.map}
          >
            {marker && (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                // pinColor={marker.color}
              ></Marker>
            )}
          </MapView>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalShowMap(!showMap)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalShowMap(true)}
      >
        <Text style={styles.textStyle}>Set location</Text>
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={5}
        style={styles.container}
      >
        <TextInput
          placeholder="Add quick task"
          style={styles.inputTask}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <MaterialIcons
            name="add-circle"
            size={30}
            color="purple"
            style={{ marginLeft: 40 }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddTask;

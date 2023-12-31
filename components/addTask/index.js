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
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
const AddTask = (props) => {
  const [task, setTask] = useState("");
  const handleAddTask = async () => {
    if (task.length == 0) {
      alert("Please input ....");
      return false;
    }
    let create = new Date();
    create = create.toISOString();
    let _task = {
      title: task,
      done: false,
      due: null,
      reminder: false,
      repeat: null,
      _id: uuidv4(),
      location: null,
      create_at: create,
      attachfiles: null,
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
      <KeyboardAvoidingView style={styles.container}>
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

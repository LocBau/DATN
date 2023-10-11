import React, { useState } from "react";
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
} from "react-native";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const AddTask = (props) => {
  const [task, setTask] = useState("");
  const handleAddTask = () => {
    if (task.length == 0) {
      alert("Please input ....");
      return false;
    }
    props.onAddTask2(task);
    setTask("");
    Keyboard.dismiss();
  };
  return (
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
  );
};
export default AddTask;

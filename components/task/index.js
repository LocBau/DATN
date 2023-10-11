import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Task = (props) => {
  // const { check } = props.status;
  const [checktask, setChecktask] = useState(props.status);
  const handleCheck = () => {
    const { checktask } = checktask === false ? true : false;
    setChecktask(checktask);
    console.log(checktask);
  };
  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <TouchableOpacity onPress={handleCheck}>
          <MaterialCommunityIcons
            name={
              checktask === false
                ? "checkbox-blank-circle-outline"
                : "checkbox-marked-circle-outline"
            }
            size={30}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText1}>{props.title}</Text>
        <Text style={styles.contentText2}>09am - 10am</Text>
      </View>
      <View style={styles.icon}>
        <MaterialIcons
          name="alarm"
          size={20}
          color="red"
          style={{ marginHorizontal: 2 }}
        />
        <MaterialIcons
          name="favorite-outline"
          size={20}
          color="red"
          style={{ marginHorizontal: 2 }}
        />
      </View>
    </View>
  );
};

export default Task;

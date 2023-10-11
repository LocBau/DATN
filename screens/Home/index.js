import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Task from "../../components/task";
import AddTask from "../../components/addTask";

const Home = (props) => {
  // const [tasklist, setTasklist] = useState([]);

  // const handleAddTask = (task) => {
  //   setTasklist([...tasklist, tasklist]);
  // };
  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerBg}
        //source={{ uri: 'https://your-unsplash-image-url.jpg' } // case for address Unsplash
        source={require("../../assets/bg1.png")}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons
              name="arrow-collapse-left"
              size={24}
              color="purple"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.headerText}>Menu</Text>
          </View>
          <View style={styles.headerRight}>
            <MaterialCommunityIcons name="apps" size={24} color="purple" />
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.bodyAdd}>
            <Text style={styles.bodyAddText1}>My day</Text>
            <Text style={styles.bodyAddText2}>Sunday, 28 April</Text>
            {props.onTasklist.map((item, index) => {
              return <Task key={index} title={item} status={check} />;
            })}
          </ScrollView>
          <ScrollView style={styles.bodyDone}></ScrollView>
        </View>

        <AddTask onAddTask2={props.onAddTask1} />
      </ImageBackground>
    </View>
  );
};

export default Home;

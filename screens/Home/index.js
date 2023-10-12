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
import React, { useState, useEffect } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Task from "../../components/task";
import AddTask from "../../components/addTask";

const Home = () => {
  const [tasklist, setTasklist] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const handleAddTask = (task) => {
    setTasklist([...tasklist, task]);
  };
  const triggerF = () => {
    setTrigger(trigger + 1);
  };
  const hanldeUpdate = (index) => {
    let newTasklist = tasklist;
    if (newTasklist[index].done) {
      newTasklist[index].done = false;
    } else {
      newTasklist[index].done = true;
    }
    console.log(newTasklist[index]);
    setTasklist(newTasklist);
    console.log(tasklist[index]);
  };

  useEffect(() => {
    console.log("chay..1");

    return () => {
      console.log("chay..2");
    };
  }, [tasklist]);
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
            {tasklist.map((item, index) => {
              console.log(item.done);
              if (!item.done)
                return (
                  <Task
                    key={index}
                    id={index}
                    title={item.title}
                    status={item.done}
                    onUpdate={hanldeUpdate}
                    trigger={triggerF}
                  />
                );
            })}
          </ScrollView>

          <ScrollView style={styles.bodyDone}>
            <Text> Done</Text>
            {tasklist.map((item, index) => {
              if (item.done)
                return (
                  <Task
                    key={index}
                    id={index}
                    title={item.title}
                    status={item.done}
                    onUpdate={hanldeUpdate}
                    trigger={triggerF}
                  />
                );
            })}
          </ScrollView>
        </View>

        <AddTask onAddTask={handleAddTask} />
      </ImageBackground>
    </View>
  );
};

export default Home;

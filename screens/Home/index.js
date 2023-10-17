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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import GetTaskApi from "../../api/getTaskApi";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Calendar from "../Calendar";
import { useDrawerStatus } from "@react-navigation/drawer";

const Home = ({ navigation }) => {
  // console.log();
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    console.log(token);
    return token;
  }
  const [tasklist, setTasklist] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [viewTaskDone, setviewTaskDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    async function fetchToken() {
      // console.log(tasklist);
      let flag = await AsyncStorage.getItem("flag");
      // console.log(flag);
      if (flag) return;
      // let token = await AsyncStorage.getItem('token');
      // let res = await GetTaskApi(token);
      // if(!res || res.status !=200) {
      //   console.log("cannot get tasks");
      //   return;
      // }
      // console.log(res.data);

      // let _newTask = res.data

      let _newTask = await AsyncStorage.getItem("task");
      _newTask = JSON.parse(_newTask).task;
      console.log(_newTask);
      for (const i of _newTask) {
        // console.log(i.title);
        // console.log(i.done);
        if (i.done) {
          setviewTaskDone(true);
          // console.log("set");
          break;
        }
      }
      setTasklist(_newTask);

      setTasklist(_newTask);
      await AsyncStorage.setItem("flag", "true");
      // console.log(tasklist);
    }
    fetchToken();
  });

  const handleAddTask = async (task) => {
    let t = [...tasklist, task];
    setTasklist(t);
    await AsyncStorage.setItem("task", JSON.stringify({ task: t }));
    // let a = await AsyncStorage.getItem('task');
    // console.log(JSON.parse(a).task);
  };
  const triggerF = () => {
    setTrigger(trigger + 1);
  };
  const hanldeUpdate = async (index) => {
    let newTasklist = tasklist;
    if (newTasklist[index].done) {
      newTasklist[index].done = false;
    } else {
      newTasklist[index].done = true;
    }
    console.log(newTasklist[index]);
    setTasklist(newTasklist);
    AsyncStorage.setItem("task", JSON.stringify({ task: newTasklist }));
    // console.log(tasklist[index]);
    setviewTaskDone(true);
  };

  const handleViewTaskListDone = () => {
    if (isVisible) {
      // setviewTaskDone(false);
      setIsVisible(false);
    } else {
      // setviewTaskDone(true);
      setIsVisible(true);
    }
  };
  // useEffect(() => {
  //   console.log("chay..1");

  //   return () => {
  //     console.log("chay..2");
  //   };
  // }, [tasklist]);

  // const [check, setCheck] = useState(false);

  // const Drawer = createDrawerNavigator();
  // const isDrawerOpen = useDrawerStatus() === "open";
  // const HomeDrawerScreen = () => {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="Home" component={Home} />
  //       {/* <Drawer.Screen name="Analytisc" component={} /> */}
  //       <Drawer.Screen name="Calendar" component={Calendar} />
  //     </Drawer.Navigator>
  //   );
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerBg}
        //source={{ uri: 'https://your-unsplash-image-url.jpg' } // case for address Unsplash
        source={require("../../assets/bg1.png")}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <MaterialCommunityIcons
              name="arrow-collapse-left"
              size={24}
              color="purple"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.headerText}>Menu</Text>
          </TouchableOpacity>
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
                    _id={item._id}
                    title={item.title}
                    status={item.done}
                    onUpdate={hanldeUpdate}
                    trigger={triggerF}
                  />
                );
            })}
            <View style={styles.bodyDone}>
              <TouchableOpacity onPress={handleViewTaskListDone}>
                {viewTaskDone && (
                  <View style={styles.viewTaskDone}>
                    <MaterialCommunityIcons
                      name={isVisible === false ? "arrow-right" : "arrow-down"}
                      size={24}
                      color="purple"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.taskdonetext}> Task Done</Text>
                  </View>
                )}
              </TouchableOpacity>
              {isVisible &&
                tasklist.map((item, index) => {
                  if (item.done)
                    return (
                      <Task
                        key={index}
                        id={index}
                        _id={item._id}
                        title={item.title}
                        status={item.done}
                        onUpdate={hanldeUpdate}
                        trigger={triggerF}
                      />
                    );
                })}
            </View>
          </ScrollView>
          {/* <ScrollView style={styles.bodyDone}>
            <TouchableOpacity onPress={handleViewTaskDone}>
              <View style={styles.viewTaskDone}>
                <MaterialCommunityIcons
                  name={viewTaskDone === false ? "arrow-right" : "arrow-down"}
                  size={24}
                  color="purple"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.taskdonetext}> Task Done</Text>
              </View>
            </TouchableOpacity>
            {isVisible &&
              tasklist.map((item, index) => {
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
          </ScrollView> */}
        </View>

        <AddTask onAddTask={handleAddTask} />
      </ImageBackground>
    </View>
  );
};

export default Home;

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
  LogBox,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import BackGround from "../../components/backGround";
import RealTimeFormatDate from "../../components/realTimeFormatDate";
import UpdateTaskApi from "../../api/updateTaskApi";
import DetailTask from "../../screens/DetailTask";
import { useIsFocused } from '@react-navigation/native'
const Home = ({ navigation }) => {
  
  const [tasklist, setTasklist] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [viewTaskDone, setviewTaskDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused()
  useEffect(() => {
    async function fetchToken() {
      // console.log(tasklist);
      // await AsyncStorage.removeItem("tasks");
      console.log("focus"+ isFocused);
      if (!isFocused) return;
      let flag = await AsyncStorage.getItem("flag");
      console.log(flag);
      if (flag) return;
      let token = await AsyncStorage.getItem("token");
      let res = await GetTaskApi(token);
      if (!res || res.status != 200) {
        console.log("cannot get tasks");
      }
      res = res.data;
      // console.log(res.data);

      // let _newTask = res.data

      let _newTask = await AsyncStorage.getItem("tasks");
      _newTask = JSON.parse(_newTask);
      if (!_newTask) _newTask = {};
      if (!res) res = {};
      if (_newTask.timestamp && res.timestamp) {
        if (res.timestamp < _newTask.timestamp) {
          _newTask = _newTask.task;
          UpdateTaskApi(token, _newTask);
        } else if (res.timestamp == _newTask.timestamp) {
          _newTask = _newTask.task;
        } else {
          _newTask = res.task;
          await AsyncStorage.setItem("tasks", JSON.stringify(res));
        }
      } else {
        console.log(res.timestamp);
        if (res.timestamp) {
          await AsyncStorage.setItem("tasks", JSON.stringify(res));
          _newTask = res.task;
        } else {
          if (_newTask) {
            _newTask.timestamp = Date.now();
          } else {
            _newTask = {
              timestamp: Date.now(),
              task: [],
            };
          }
          UpdateTaskApi(token, _newTask);

          await AsyncStorage.setItem("tasks", JSON.stringify(_newTask));
          _newTask = _newTask.task;
        }
      }

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
  },[isFocused]);

  const handleAddTask = async (task) => {
    let t = [...tasklist, task];
    setTasklist(t);
    let token = await AsyncStorage.getItem("token");
    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify({ timestamp: Date.now(), task: t })
    );
    UpdateTaskApi(token, { timestamp: Date.now(), task: t });
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
    AsyncStorage.setItem(
      "tasks",
      JSON.stringify({ timestamp: Date.now(), task: newTasklist })
    );
    let token = await AsyncStorage.getItem("token");
    // console.log(tasklist[index]);
    setviewTaskDone(true);
    UpdateTaskApi(token, { timestamp: Date.now(), task: newTasklist });
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

  /**
   * code using for BottomSheetModal:
   *
   */
  // ref;
  const bottomSheetModalRef = useRef(null);
  // state
  const [isSheetClosed, setIsSheetClosed] = useState(true);
  // variables
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setIsSheetClosed(false);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetClose = () => {
    console.log("da bam");
    bottomSheetModalRef.current?.dismiss(); // Đóng BottomSheet khi người dùng bấm bên ngoài
  };
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      bottomSheetModalRef.current?.dismiss();
      console.log("da dong");
    } else {
      console.log("da mo");
      bottomSheetModalRef.current?.present();
    }
  }, []);

  /**
   * code using for BottomSheetModal:
   *
   */
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log("component cha:", item);
    setBackground(item);
    setIsButton1Pressed(false);
  };

  const handleSelectImage = () => {};

  const [isButton1Pressed, setIsButton1Pressed] = useState(true);
  const [background, setBackground] = useState(require("../../assets/bg1.png")); // Sử dụng require ngay từ ban đầu

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []); // doan code nay de giấu lỗi : 'VirtualizedLists should never be
  // nested inside plain ScrollViews with the same orientation because it
  // can break windowing and other functionality -
  //use another VirtualizedList-backed container instead '
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerBg}
        //source={{ uri: 'https://your-unsplash-image-url.jpg' } // case for address Unsplash
        //source={require("../../assets/bg1.png")} // case for Image in folder Assets
        source={
          isButton1Pressed
            ? background // Sử dụng require ở đây
            : { uri: background } // Sử dụng URI ở đây nếu cần
        }
        // source={
        //   isButton1Pressed
        //     ? require({ uribackground })
        //     : { uri: "https://source.unsplash.com/random" }
        // }
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

          <TouchableOpacity
            style={styles.headerRight}
            onPress={handlePresentModalPress}
          >
            <MaterialCommunityIcons name="apps" size={24} color="purple" />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <ScrollView style={styles.bodyAdd}>
            <Text style={styles.bodyAddText1}>My day</Text>
            {/* <Text style={styles.bodyAddText2}>Sunday, 28 April</Text> */}
            <RealTimeFormatDate />
            {tasklist.map((item, index) => {
              console.log(item.done);
              if (!item.done)
                return (
                  <TouchableOpacity key={index}
                    onPress={() => navigation.navigate("DetailTask" , {
                      task:item
                    }) }
                  >
                    <Task
                      key={index}
                      id={index}
                      _id={item._id}
                      title={item.title}
                      status={item.done}
                      due={item.due}
                      onUpdate={hanldeUpdate}
                      trigger={triggerF}
                    />
                  </TouchableOpacity>
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
                        due={item.due}
                        onUpdate={hanldeUpdate}
                        trigger={triggerF}
                      />
                    );
                })}
            </View>
          </ScrollView>
        </View>

        <AddTask onAddTask={handleAddTask} />
        <BottomSheetModalProvider>
          <View style={styles.containerBottomSheet}>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              enableDismissOnClose={true}
              onChange={handleSheetChanges}
              // onClose={handleSheetClose}
            >
              <BottomSheetScrollView>
                <BackGround onItemSelect={handleItemSelect} />
              </BottomSheetScrollView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
};

export default Home;

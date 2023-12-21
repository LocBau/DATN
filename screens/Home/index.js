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
import { useIsFocused } from "@react-navigation/native";
const Home = ({ navigation }) => {
  const WEEKDAY = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const ADDDATEVALUE = 86400000;
  const [tasklist, setTasklist] = useState([]);
  const [viewtask, setView] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [viewTaskDone, setviewTaskDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused();

  async function getView() {
    let d = new Date();
    console.log(d);
    d = "" + d.getFullYear() + '-' + (d.getMonth()+1)  + '-' + (d.getDate() < 10  ? "0" + d.getDate()  : d.getDate());
    
    let tasks = await AsyncStorage.getItem("tasks");
    
    
    tasks = JSON.parse(tasks);

    tasks = tasks.task;
    console.log(tasks);
    let data = {repeat:[]};
    let _view = [{title:d, data:[]}];
    for (const i of tasks) {
      if(!i.create_at && !i.due && !i.repeat) continue;
      let timestamp = "";
      if(i.create_at) timestamp = i.create_at
      if (i.due && !i.repeat)timestamp =  i.due


    if (i.reminder && !i.repeat) timestamp = i.reminder;
    let _date = timestamp.split("T");
    let temp = new Date(timestamp);

    let _hour = temp.toTimeString().split(":");
    if (i.repeat) {
      let t = new Date(i.repeat.hour);
      let _timestamp = new Date(timestamp);

      _timestamp.setHours(t.getHours());
      _timestamp.setMinutes(t.getMinutes());
      timestamp = _timestamp.toISOString();
      _hour = _timestamp.toTimeString().split(":");
      console.log(_hour);
      data["repeat"].push({
        hour: _hour[0] + ":" + _hour[1],
        title: i.repeat.type + "-" + i.title,
        data: i,
        timestamp: timestamp,
        repeat: i.repeat,
      });
      continue;
    }
    if (!data[_date[0]]) {
      data[_date[0]] = [
        {
          hour: _hour[0] + ":" + _hour[1],
          title: i.title,
          data: i,
          timestamp: timestamp,
        },
      ];
    } else {
      data[_date[0]].push({
        hour: _hour[0] + ":" + _hour[1],
        title: i.title,
        data: i,
        timestamp: timestamp,
      });
    }
  }

  function compareDate(a, b) {
    let a_date = new Date(a.timestamp).getTime();
    let b_date = new Date(b.timestamp).getTime();
    return a_date - b_date;
  }
  _view[0].data = data[d] || [];



    for (const i of data["repeat"]) {

      if (i.repeat.type.includes("Daily")) {
        
        let t = new Date(i.repeat.hour);
        let _timestamp = new Date(d);
              console.log(_timestamp);
        _timestamp.setHours(t.getHours());
        _timestamp.setMinutes(t.getMinutes());
        _timestamp.setSeconds(t.getSeconds());
        _timestamp.setMilliseconds(t.getMilliseconds());
        let temp = i;
        temp.timestamp = _timestamp.toISOString();
        if(!i.gmail || !i.repeat.info || !i.repeat.info.INTERVAL) {
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          _view[0].data.push(temp);
          continue;
        } else {
          let interval = parseInt(i.repeat.info.INTERVAL);
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          if (count % interval !=0) continue;
          _view[0].data.push(temp);
        }
      }

      if (i.repeat.type.includes("Weekly")) {
        let t = new Date(i.repeat.hour);
        let _timestamp = new Date(d);
        _timestamp.setHours(t.getHours());
        _timestamp.setMinutes(t.getMinutes());
        _timestamp.setSeconds(t.getSeconds());
        _timestamp.setMilliseconds(t.getMilliseconds());
        let temp = i;
        temp.timestamp = _timestamp.toISOString();
        if(_timestamp.getDay() ==1 && !i.gmail) {
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          _view[0].data.push(temp);
          continue;
        }
        if(i.gmail && i.repeat.info && i.repeat.info.BYDAY) {
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          let byday = i.repeat.info.BYDAY.split(",");
          for (const i of byday) {
            if(_timestamp.getDay() == WEEKDAY.indexOf(i)){
              _view[0].data.push(temp);
              break;
            };
          }

        } 
      }

      if (i.repeat.type.includes("Monthly")) {
        let t = new Date(i.repeat.hour);
        let _timestamp = new Date(d);
        _timestamp.setHours(t.getHours());
        _timestamp.setMinutes(t.getMinutes());
        _timestamp.setSeconds(t.getSeconds());
        _timestamp.setMilliseconds(t.getMilliseconds());
        let temp = i;
        temp.timestamp = _timestamp.toISOString();
        if(_timestamp.getDate() ==15 && !i.gmail && (!i.repeat.info)) {
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          _view[0].data.push(temp);
        } else if (i.gmail || i.repeat.info){
          let interval = parseInt(i.repeat.info.INTERVAL) || 1;
          let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
          if (count < 0 ) continue;
          if (_timestamp.getDate() !== 6) continue;
          let check = _timestamp.getMonth() + (_timestamp.getFullYear()-t.getFullYear())*12 - t.getMonth();
          if (check % interval !=0) continue;
          _view[0].data.push(temp);
        }
        
      }
    };

    _view[0].data.sort(compareDate);
  console.log("v"+ JSON.stringify(_view[0].data));
  console.log("d" + d + JSON.stringify(data[d]));
  let view = [];
  
  for (const i of _view[0].data) {
    view.push(i.data);
  }
  setView(view);
  console.log("v2"+ JSON.stringify(viewtask));

    return _view[0].data;
}

  useEffect(() => {
    async function fetchToken() {
      // console.log(tasklist);
      // await AsyncStorage.removeItem("tasks");
      console.log("focus" + isFocused);
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
      if (res && res.google_events) {
        // console.log(res.google_events);
        let google_events = [];
        for (const k in res.google_events) {
          if (Object.hasOwnProperty.call(res.google_events, k)) {
            for (const i of res.google_events[k]) {
              let due = null;
              if (i.end && i.end.dateTime) due = i.end.dateTime;
              if (i.end && i.end.date) due = i.end.date;
              if (due) {
                let temp = new Date(due);
                due = temp.toISOString();
              }
              let repeat = null;
              if (i.recurrence && i.recurrence[0]) {
                let type = "";
                if (i.recurrence[0].includes("WEEKLY")) type = "Weekly";
                if (i.recurrence[0].includes("DAILY")) type = "Daily";
                if (i.recurrence[0].includes("MONTHLY")) type = "Monthly";
                let info = {};
                if (i.recurrence[0].includes("BYDAY="))
                  info["BYDAY"] = i.recurrence[0]
                    .split("BYDAY=")[1]
                    .split(";")[0];
                if (i.recurrence[0].includes("INTERVAL="))
                  info["INTERVAL"] = i.recurrence[0]
                    .split("INTERVAL=")[1]
                    .split(";")[0];
                if (i.recurrence[0].includes("WKST="))
                  info["WKST"] = i.recurrence[0]
                    .split("WKST=")[1]
                    .split(";")[0];
                repeat = {
                  type: type,
                  hour: due,
                  info: info,
                };
              }
              let location = null;
              if (i.location) {
                location = {
                  name: i.location,
                  latitude: 10.861387059389518,
                  longitude: 106.7656611593152,
                };
              }
              let t = {
                gmail: k,
                title: i.summary || "No title",
                done: false,
                due: repeat ? null : due,
                reminder: false,
                repeat: repeat,
                _id: i.id,
                location: location,
                create_at: i.created,
                // note : i.description || "",
                hangoutLink: i.hangoutLink || null,
              };
              google_events.push(t);
            }
          }
        }
        // console.log(JSON.stringify(google_events));
        AsyncStorage.setItem("google_events", JSON.stringify(google_events));
      }
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

    
    getView();
    fetchToken();

  }, [isFocused]);

  const handleAddTask = async (task) => {
    let t = [...tasklist, task];
    setTasklist(t);
    let token = await AsyncStorage.getItem("token");
    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify({ timestamp: Date.now(), task: t })
    );
    await getView();
    triggerF();
    UpdateTaskApi(token, { timestamp: Date.now(), task: t });
    // let a = await AsyncStorage.getItem('task');
    // console.log(JSON.parse(a).task);
  };
  const triggerF = () => {
    setTrigger(trigger + 1);
  };
  const hanldeUpdate = async (index) => {
    let newTasklist = tasklist;
    // if (newTasklist[index].done) {
    //   newTasklist[index].done = false;
    // } else {
    //   newTasklist[index].done = true;
    // }
    if(newTasklist) {
      for (let i = 0; i < newTasklist.length; i++) {
        const e = newTasklist[i];
        if (e._id == index) {
          newTasklist[i].done =  !newTasklist[i].done;
          break;
        }
      }
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
    await getView();
    triggerF();
    UpdateTaskApi(token, { timestamp: Date.now(), task: newTasklist });
  };
  const handleFavorite = async (index,favorite) => {
    let newTasklist = tasklist;
    // if (newTasklist[index].done) {
    //   newTasklist[index].done = false;
    // } else {
    //   newTasklist[index].done = true;
    // }
    if(newTasklist) {
      for (let i = 0; i < newTasklist.length; i++) {
        const e = newTasklist[i];
        if (e._id == index) {
          newTasklist[i].favorite =  favorite;
          break;
        }
      }
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
    await getView();
    triggerF()
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
            {viewtask.map((item, index) => {
              console.log(item.done);
              if (!item.done)
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("DetailTask", {
                        task: item,
                      })
                    }
                  >
                    <Task
                      key={index}
                      id={index}
                      _id={item._id}
                      title={item.title}
                      status={item.done}
                      due={item.due}
                      onUpdate={hanldeUpdate}
                      favorite={item.favorite}
                      onFavorite={handleFavorite}
                      trigger={triggerF}
                      reminder={item.reminder}
                      repeat={item.repeat}
                      location={item.location}
                      attachfiles={item.attachments}
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
                viewtask.map((item, index) => {
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
                        onFavorite={handleFavorite}
                        favorite={item.favorite}
                        trigger={triggerF}
                        reminder={item.reminder}
                        repeat={item.repeat}
                        location={item.location}
                        attachfiles={item.attachments}
                      />
                    );
                })}
            </View>
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={10}
        >
          <AddTask onAddTask={handleAddTask} />
        </KeyboardAvoidingView>

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

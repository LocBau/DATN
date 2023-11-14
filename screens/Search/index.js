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
  RefreshControl,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./style";
import { Button, Input, SearchBar } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../../components/task";

const Search = ({ navigation }) => {
  const [task, setTask] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTaskName, setSearchTaskName] = useState([]);
  const [resultTaskName, setResultTaskName] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    console.log("khi keo...");
    setFlag(false);
    setRefreshing(true);
    setTimeout(() => {
      console.log("refffff");
      setRefreshing(false);
    }, 1000);
  }, []);

  console.log("Log of SearchScreen");
  console.log("Task:", searchTaskName);
  console.log("resultTask:", resultTaskName);
  console.log("ket thuc ...");
  useEffect(() => {
    console.log("start Efect..");
    console.log("flag status:", flag);
    if (flag) return;
    async function getTask() {
      let _task = await AsyncStorage.getItem("tasks");
      // let g_event = await AsyncStorage.getItem('google_events');
      if (!task) return;
      _task = JSON.parse(_task);
      if (!_task || !_task.task) return;
      _task = _task.task;
      setTask(_task);
      setSearchTaskName(_task);
      setFlag(true);
    }
    getTask();
  }, [refreshing]);

  const handleSearch = (t) => {
    console.log("start searching...");
    console.log(task);
    console.log("keyword:", t);
    setSearch(t);
    // day la ham search
    if (t === "") {
      setResultTaskName([]);
      return;
    }
    let s = task.filter((v, i) => {
      const n = v.title.toLowerCase();
      if (n.includes(t.toLowerCase())) return v;
    });
    setResultTaskName(s);
    console.log("resultTask:", resultTaskName);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerbg}
        //source={{ uri: 'https://your-unsplash-image-url.jpg' } // case for address Unsplash
        source={require("../../assets/bg_Search.jpg")} // case for Image in folder Assets
      >
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Type to search ..."
            value={search}
            onChangeText={(t) => handleSearch(t)}
            // onSubmitEditing={}
            lightTheme
            round
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <ScrollView
          style={styles.listresult}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="blue"
            />
          }
        >
          {resultTaskName.map((v, i) => {
            {
              console.log("teee:", i);
            }
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("DetailTask", {
                    task: v,
                  })
                }
              >
                <Task
                  key={i}
                  id={i}
                  _id={v._id}
                  title={v.title}
                  status={v.done}
                  due={v.due}
                  reminder={v.reminder}
                  repeat={v.repeat}
                  location={v.location}
                  attachfiles={v.attachments}
                  //   onUpdate={hanldeUpdate}
                  //   trigger={triggerF}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Search;

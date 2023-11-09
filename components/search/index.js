import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
const Search = () => {
  const [task, setTask] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [searchTaskName, setSearchTaskName] = useState([]);

  console.log("test1");
  useEffect(()=> {
    
    console.log("test1");
    if(flag) return;
    async function getTask() {
      let _task = await AsyncStorage.getItem('tasks');
      // let g_event = await AsyncStorage.getItem('google_events');
      if (!task) return;
      _task = JSON.parse(_task);
      if(!_task || !_task.task) return;
      _task = _task.task;
      setTask(_task);
      setSearchTaskName(_task);
      setFlag(true);
    }
    getTask();
  },[])

  const Search = (t) => {
    console.log(t);
    setSearch(t);
    // day la ham search
    let s = task.filter((v,i)=> {
      const n = v.title.toLowerCase();
      
      if (n.includes(t.toLowerCase())) return v; 
    })
    setSearchTaskName(s);

  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {/* <Text>asdsadsasd</Text> */}
        <TextInput
        onChangeText={(t)=> Search(t)}
        value={search}
        placeholder="search here"
        />
        {searchTaskName.map((v,i)=> {
          return <Text key={i}
          >{v.title}</Text>
        })}
      </View>
    </View>
  );
};

export default Search;

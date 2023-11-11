import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import SendAudioFile from '../../api/sendAudioFile';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import openMap from 'react-native-open-maps';
import UpdateTaskFrontEnd from '../../api/updateTaskFrontEnd';
import { v4 as uuidv4 } from "uuid";
export default function MicroPhone() {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);
  const [flag, setflag] = useState(null);
  const [status, setStatus] = useState('');
  const [task, settask] = useState([]);
  const [select, setselect] = useState(null);
  const [viewtemp, setView] = useState(null);
  const [create, setcreate] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [phrase, setphrase] = useState("phrase....");

  const [googleevent, setgoogleevent] = useState('');
  const isfocus = useIsFocused();
  const WEEKDAY = ["SU" , "MO" , "TU" , "WE" , "TH" , "FR" , "SA"];
  const ADDDATEVALUE = 86400000;
  useEffect(() => {
    console.log("microfocus" + isfocus);
    // Simply get recording permission upon first render
    async function getPermission() {
      let update = await AsyncStorage.getItem('microphone');
      if (update && status) return;
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)


      }).catch(error => {
        console.log(error);
      });
      setStatus("idle");
      let google_events = await AsyncStorage.getItem('google_events');
      if (google_events) {
        setgoogleevent(google_events)
      };
      // console.log("g"+googleevent);
      let _task = await AsyncStorage.getItem('tasks');
      if (_task) {
        _task = JSON.parse(_task);
      }
      if (_task) {
        _task = _task.task;
        if (_task) {
          settask(_task);
        }
      }
      

    }
    
    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [isfocus]);

  const HandleDirectMap = () => {
    let _select = select?.data;
    // console.log(select.location);
    // console.log(!select);
    if(!_select || !_select.location) return true;
    let _end = ""
    if(_select.location.latitude) {
      _end = '' + _select.location.latitude +', ' + _select.location.longitude;
    } else {
      _end = _select.location.name;
    }
    
    openMap({ provider: 'google', end:  _end , travelType:"drive"});
    return;
  }
  const HandleSetReminder = async (reminder) => {
    let _select = select?.data || select;
    // console.log(select.location);
    console.log( reminder );

    if(!_select || _select.repeat || _select.gmail ) return true;
    _select.due = null;
    _select.reminder = reminder;
    await UpdateTaskFrontEnd(_select);
    let res = await AsyncStorage.getItem('tasks');
    if (res) {
      res = JSON.parse(res);
    }
    if (res) {
      res = res.task;
      if (res) {
        settask(res);
      }
    }
    return;
  }
  const HandleCreateTask = async (name) => {
    let date = new Date();
    date = date.toISOString();
    let _task = {
      title: name,
      done: false,
      due: null,
      reminder: false,
      repeat: null,
      _id: uuidv4(),
      location: null,
      create_at: date,
    };
    await UpdateTaskFrontEnd(_task);
    let res = await AsyncStorage.getItem('tasks');
    if (res) {
      res = JSON.parse(res);
    }
    if (res) {
      res = res.task;
      if (res) {
        settask(res);
      }
    }
    return _task;
  }
  async function getView(d) {

        let tasks = task;
        let google_events = googleevent;

        if(google_events) {
          google_events = JSON.parse(google_events);
        }
        if(google_events && tasks) {
          tasks = tasks.concat(google_events);
        }
        // console.log(google_events);

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
        return _view[0].data;
  }

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }
      let option = Audio.RecordingOptionsPresets.HIGH_QUALITY;
      // option.ios.extension = ".wav"
      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      // console.log(option);
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        // console.log(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        setRecording(null);
        setRecordingStatus('stopped');
        setStatus("Processing...");
        
        const f  = await FileSystem.readAsStringAsync(recordingUri,{ encoding: FileSystem.EncodingType.Base64 });
        let res = await SendAudioFile(f);
        if(!res || res.status!==200) {
          setflag(false);
          setphrase("Error when connect to service")
          Speech.speak("Error when connect to service");
          return;
        }
        let data = res.data;
        if(!data || !data.intent && !create) {
          setflag(false);
          setphrase("Please repeat")
          // Speech.speak("Please repeat");
        }
        setStatus(`you say: ${data.result}`);
        let today = new Date().toLocaleDateString().split('/');
        today = "" + today[2] + '-' + today[1]  + '-' + today[0];
        if(data.intent !="CANCEL" && create && data.result && !confirm) {
          setconfirm(data.result);
          setphrase("Please confirm if you want task name to be, " + data.result);
          Speech.speak("Please confirm if you want task name to be, " + data.result);
        }
        else if (data.intent=="YES" && create && confirm) {
          let n = await HandleCreateTask(confirm);
          setcreate(false);
          setconfirm(false);
          if(n) {
            
          setselect(n);
          setphrase("task create and selected: , you might want to set reminder to it now " + confirm);
          
          Speech.speak("task create and selected, you might want to set reminder to it now");
          }else {
            Speech.speak("Error when create task, cancel the process");
          setphrase("Error when create task, cancel the process");
          }
          
          
        }
        else if (data.intent =='CANCEL') {
          setcreate(false);
          setconfirm(false);
          setphrase("Cancel create task");
          Speech.speak("Cancel create task");
        }
        else if (data.intent == 'SHOW_TASK') {
          // console.log(task);
          let _phrase ="Here your today task ";
          let no_task = "you got no task";
          if(data.info.day=="NEXT_DAY") {
            _phrase ="Here your tomorrow task ";
            let nextday = new Date();
            nextday.setDate(nextday.getDate()+1);
            console.log(nextday.toLocaleDateString());
            nextday = nextday.toLocaleDateString().split('/');
            nextday = "" + nextday[2] + '-' + nextday[1]  + '-' + nextday[0];


            let view = await getView(nextday);
            console.log("v"+view);
            if (view) {
              for (let i = 0; i < view.length; i++) {
                const e = view[i];
                let from_google = '';
                if (e.data.gmail) from_google = ' google task ';
                _phrase +=  "number "  +  (i+1)+ ' '  + from_google +e.title  + ", ";
                
                
                no_task='';
              }
              setView(view);
            }  
          } else {
            
            let view = await getView(today);
            console.log("v"+view);
            if (view) {
              for (let i = 0; i < view.length; i++) {
                const e = view[i];
                let from_google = '';
                if (e.data.gmail) from_google = ' google task ';
                _phrase +=  "number "  +  (i+1)+ ' '  + from_google +e.title  + ", ";
                
                
                no_task='';
              }
              setView(view);
            }  
          }
          
          if(no_task) {
            Speech.speak(no_task);
            setphrase(no_task);
          } else {
            console.log(_phrase);
            Speech.speak(_phrase);
            setphrase(_phrase);
          }
          setflag(false);
        } else if (data.intent =="SELECT_TASK") {
          if(data.info.number && viewtemp && (viewtemp[data.info.number-1])) {
            
            setselect(viewtemp[data.info.number-1]);
            setphrase(`task number ${data.info.number} is Selected` );
          Speech.speak(`task number ${data.info.number} is Selected` );
            
          } else {
            setphrase("Sorry, I cannot found the task number "+ data.info.number);
            Speech.speak("Sorry, I cannot found the task number "+ data.info.number);
            
          }
          setflag(false);
        } else if (data.intent =="SHOW_DETAIL") {
          if(select) {
            let _temp = select;
            delete _temp._id;
            delete _temp.create_at;

            setphrase("here's detail " + JSON.stringify(select));
            Speech.speak("here's detail " + JSON.stringify(select));
          } else {
            setphrase("no task is current selected");
            Speech.speak("no task is current selected");
          }
        } else if (data.intent =="DIRECT") {
          setflag(false);
          let direct = HandleDirectMap();
          if(direct) {
            setphrase("no task is current selected or task don't have location");
            Speech.speak("no task is current selected or task don't have location");
          }

        } else if (data.intent =="SET_REMINDER") {
          setflag(false);
          let date = data.info.day;
          let time = data.info.time;
          if(date || time || data.info.number < 24) {
            let reminder = new Date();
            if (date == "NEXT_DAY") reminder.setDate(reminder.getDate()+1);
            console.log(reminder);
            if(time== "MORNING") reminder.setHours(9);
            if(time== "AFTERNOON") reminder.setHours(15);
            if(time== "EVENING") reminder.setHours(20);
            console.log(reminder);
            if(data.info.number < 24) reminder.setHours(data.info.number);
            let set_reminder = await HandleSetReminder(reminder.toISOString());
            if(set_reminder) {
              setphrase("Sorry but cannot set reminder to a repeated task or task no task is selected");
              Speech.speak("Sorry but cannot set reminder to a repeated task or task no task is selected");
            } else {
              setphrase(`Reminder is set to ${date? date : "today"} ${time ? time : ""} ${data.info.number || ""}`);
              Speech.speak(`Reminder is set to ${date? date : "today"} ${time ? time : ""} ${data.info.number || ""}`);
            }
          } else {
            setphrase("invalid date time to set");
            Speech.speak("invalid date time to set");
          }


        } else if (data.intent=='CREATE') {
          setcreate(true);
          setphrase("I'm about to create a task for you,  what name it should be ?");
          Speech.speak("I'm about to create a task for you,  what name it should be ?");
        } 
        else {
          setflag(false);
          setphrase("Please repeat");
          Speech.speak("Please repeat");
        }


      }
      setflag(false);
    } catch (error) {
      console.error('Failed to stop recording', error);
      setflag(false);
    }
  }

  async function handleRecordButtonPress() {
    // console.log(recording);
    if (flag ) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        // console.log('Saved audio file to', audioUri);
      }
    } else {
      setflag(true);
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.recordingStatusText}>Selected task: </Text>
      <View
      style={{
        
        borderBottomColor: "green",
        borderBottomWidth: 2,
        borderTopColor: "green",
        borderTopWidth: 2,
        borderLeftColor: "green",
        borderLeftWidth: 2,
        borderRightColor: "green",
        borderRightWidth: 2,
        width: "70%",
        height: "30%"
      }}
       >
      <TextInput multiline={true}
      value={select ? JSON.stringify(select) : ""}
      numberOfLines={20}
      editable={false}
      style={{padding: 20}}
      />
      </View>
      <Text style={styles.recordingStatusText}>Response: </Text>
      <View
      style={{
        
        borderBottomColor: "purple",
        borderBottomWidth: 2,
        borderTopColor: "purple",
        borderTopWidth: 2,
        borderLeftColor: "purple",
        borderLeftWidth: 2,
        borderRightColor: "purple",
        borderRightWidth: 2,
        width: "70%",
        height: "30%"
      }}
       >
      <TextInput multiline={true}
      value={phrase}
      numberOfLines={20}
      editable={false}
      style={{padding: 20}}
      />
      </View>
      <Text style={styles.recordingStatusText}>You said: </Text>
      <View
      style={{
        
        borderBottomColor: "green",
        borderBottomWidth: 2,
        borderTopColor: "green",
        borderTopWidth: 2,
        borderLeftColor: "green",
        borderLeftWidth: 2,
        borderRightColor: "green",
        borderRightWidth: 2,
        width: "70%",
        height: "10%"
      }}
       >
      <TextInput multiline={true}
      value={status}
      numberOfLines={20}
      editable={false}
      style={{padding: 20}}
      />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 16,
  },
});
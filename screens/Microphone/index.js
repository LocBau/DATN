import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import SendAudioFile from '../../api/sendAudioFile';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MicroPhone() {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);

  useEffect(() => {

    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

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
        const f  = await FileSystem.readAsStringAsync(recordingUri,{ encoding: FileSystem.EncodingType.Base64 });
        let intent = await SendAudioFile(f);
        console.log(intent);
        if (intent == 'SHOW_TASK') {
          let tasks = await AsyncStorage.getItem('tasks');
          tasks = JSON.parse(tasks);
          console.log(tasks);
          for (let i = 0; i < tasks.task.length; i++) {
            const e = tasks.task[i];
            phrase = i+ ' ' + e.title;
            console.log(phrase);
            Speech.speak(phrase);
          }
        } else {
          Speech.speak("Please repeat");
        }

        
        // console.log(f);
        // Create a file name for the recording
        // const fileName = `recording-${Date.now()}.caf`;

        // // Move the recording to the new directory with the new file name
        // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        // await FileSystem.moveAsync({
        //   from: recordingUri,
        //   to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        // });

        // // This is for simply playing the sound back
        // const playbackObject = new Audio.Sound();
        // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        // await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    console.log(recording);
    if (recording && recordingStatus==='recording' ) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', audioUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
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
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'red',
  },
  recordingStatusText: {
    marginTop: 16,
  },
});
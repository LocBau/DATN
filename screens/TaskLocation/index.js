import React from 'react';
import { useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text ,  Modal, Pressable, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import openMap from 'react-native-open-maps';

const MapScreen = ({navigation})=> {
  const [region, setRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    });
  const [markers, setMarker] = useState([])
  const [flag, setFlag] = useState(false);
  const [select, setSelect] = useState('');
  // const [marker, setMarkers] = useState({
  //     coordinate: {
  //       latitude: 4,
  //       longitude: 4,
  //       },
  //     key: 0,
      
  //   })
  //   const onMapPress = (e) => {
  //     console.log(e.nativeEvent);
  //     let m = {
  //       coordinate: {
  //         latitude: e.nativeEvent.coordinate.latitude,
  //         longitude: e.nativeEvent.coordinate.longitude,
  //         },
  //       key: 0,
        
  //     }
  //     setMarkers(m);
  //   }
    const HandleCallout = (item) => {
      setSelect(item);
      
      console.log(select);
    }
    const HandleDetail = () => {
      
      let i = select;
      setSelect('');
      // console.log("se"+JSON.stringify(i));
      navigation.navigate('DetailTask', {task:i.task})

    }

    const HandleBack = () => {
      setSelect('');
      navigation.navigate('HomeDrawer');
    }
    const HandleDirectMap = () => {
      if(!select) return;

      let _end = '' + select.coordinate.latitude +', ' + select.coordinate.longitude;
      setSelect('');
      openMap({ provider: 'google', end:  _end , travelType:"drive"});

    }
  // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

  useEffect(()=>{
    if (flag) {
      return;
    }
    const getTask = async () => {
      let k = 0;
      let list = [];
      let sumLat = 0;
      let sumLong = 0;
      let maxLat = -999;
      let minLat = 999;
      let maxLong = -999;
      let minLong = 999;

      let tasks = await AsyncStorage.getItem('tasks');
      console.log(tasks);
      if (tasks) tasks = JSON.parse(tasks).task;
      if (tasks) {
        for (const i of tasks) {
          if(i.location) {
            list.push({coordinate:i.location, task:i,title: i.title, key:k++, due: i.due, done:i.done, color: i.done ? 'rgba(60, 179, 113, 0.7)' : 'rgba(255, 99, 71, 0.7)'})
            sumLat+=i.location.latitude;
            sumLong+=i.location.longitude;
            maxLat = i.location.latitude > maxLat ? i.location.latitude : maxLat;
            minLat = i.location.latitude < minLat ? i.location.latitude : minLat;
            maxLong = i.location.longitude > maxLong ? i.location.longitude : maxLong;
            minLong = i.location.longitude < minLong ? i.location.longitude : minLong;
          }
        }
      }
      setFlag(true);
      if (k==0) return;
      let centerLat = sumLat/k;
      let centerLong = sumLong/k;
      maxLong = Math.abs(centerLong-maxLong);
      minLong = Math.abs(centerLong-minLong);
      maxLat = Math.abs(centerLat-maxLat);
      minLat = Math.abs(centerLat-minLat);
      deltaLat = maxLat > minLat ? maxLat : minLat;
      deltaLong =  maxLong > minLong ? maxLong : minLong;
      deltaLat*=2.4;
      deltaLong*=2.4;
      let newRegion = {
        latitude:centerLat,
        longitude:centerLong,
        latitudeDelta: deltaLat > 0.0322 ? deltaLat : 0.0322,
        longitudeDelta: deltaLong > 0.0221 ? deltaLong : 0.0221,
      };
      console.log(deltaLong);
      console.log(newRegion);
      setRegion(newRegion);
      setMarker(list);
    };

    getTask();
  })

    if (markers.length != 0) {
      return (    
      <View >
        <Modal
        animationType="slide"
        transparent={true}
        visible={select ? true : false}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSelect('');
        }}>
          
        <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
          <Text>{select.title}</Text>
          {select.due &&<Text>due: {select.due}</Text>}
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => HandleDirectMap()}>
              <Text style={styles.textStyle}>Direct to map</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setSelect('')}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                HandleDetail();
              }}>
              <Text style={styles.textStyle}>Details</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                HandleBack();
              }}>
              <Text style={styles.textStyle}>Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

        <MapView   
      region={region}
        // onPress={(e)=>{onMapPress(e)}}
        style={styles.map} >
          {
            markers.map((item)=> {
              if (item.done) {
                return (
                  <Marker
                  key={item.key}
                  coordinate={item.coordinate}
                  centerOffset={{x:0,y:-20}}
                  onSelect={(e)=>{HandleCallout(item)}}
                  title={item.due}
                  >

                    <View style={{backgroundColor: 'rgba(60, 179, 113, 0.7)', padding: 10}}>
                    <Text>{item.title}</Text>
                    </View>
                    <Text style={{textAlign: 'center'}}>📍</Text>
                  </Marker>
                )
              } else {
                return (
                  <Marker
                  key={item.key}
                  coordinate={item.coordinate}
                  centerOffset={{x:0,y:-20}}
                  title={item.due}
                  onSelect={(e)=>{HandleCallout(item)}}
                  >

                    <View style={{backgroundColor: 'rgba(255, 99, 71, 0.7)', padding: 10}}>
                    <Text>{item.title}</Text>
                    </View>
                    <Text style={{textAlign: 'center'}}>📍</Text>
                  </Marker>
                )
              }
            })
          }
          {/* <Marker
                key={0}
                coordinate={marker.coordinate}
                centerOffset={{x:0,y:-20}}
                // title={"item.title"}
                >
                  <View style={{backgroundColor: 'rgba(255, 99, 71, 0.7)', padding: 10}}>
                  <Text>{"item.title"}</Text>
                  </View>
                  <Text style={{textAlign: 'center'}}>📍</Text>
                </Marker> */}

        </MapView>
      </View>)
    } else {
      return (
        <View style={styles.container}>
          <Text>
            You have no task location in progress.
          </Text>
        </View>
      )
    }
  }
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MapScreen;

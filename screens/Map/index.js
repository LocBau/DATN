import React from 'react';
import { useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Alert, Modal, Pressable } from 'react-native';
import * as Location from 'expo-location';

const MapScreen = ()=> {
  const [region, setRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    });
  const [marker, setMarker] = useState({
      coordinate: {
        latitude: 4,
        longitude: 4,
        },
      key: 0,
      
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [flag, setFlag] = useState(false);
  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
  const onMapPress = (e) => {
    console.log(e.nativeEvent);
    let m = {
      coordinate: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        },
      key: 0,
      
    }
    setMarker(m);
  }
  useEffect(()=>{
    if (flag) {
      return;
    }
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
  
      let currentLocation = await Location.getCurrentPositionAsync({});
      // setRegion(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
      let newRegion = {
        latitude:currentLocation.coords.latitude,
        longitude:currentLocation.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      };
      setFlag(true);
      setRegion(newRegion);
      
    };

    // getPermissions();
  })
  return (
    <View style={styles.container}>
      
        <MapView   
    region={region}
    onPress={e => onMapPress(e)}
      style={styles.map} >
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}
        // pinColor={marker.color}
      >
      </Marker>
      </MapView>

    </View>
    
  );
}



export default MapScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '70%',
    height: '40%',
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


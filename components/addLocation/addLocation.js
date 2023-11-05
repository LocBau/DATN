import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View,Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import UpdateTaskFrontEnd from '../../api/updateTaskFrontEnd';
export default function AddLocation({navigation, route}) {

    const [flag1, setFlag1] = useState(false);
    const [locName,setLocName]  = useState('');
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState({
      latitude: 10.861387059389518,
      longitude: 106.7656611593152,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    });
    const [marker, setMarker] = useState("");
    // const [modalVisible, setModalVisible] = useState(false);
  
    // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
    const onMapPress = async(e) => {
      console.log(e.nativeEvent);
      let m = {
        coordinate: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        },
        key: 0,
      };
      
      setMarker(m);
      let reverse =  await reverseGeocode(m);
      if (reverse && reverse[0]) {
        let name = reverse[0].name;
        let city = reverse[0].city;
        let district = reverse[0].district;
        let street = reverse[0].street;
        let streetNumber = reverse[0].streetNumber;
        if (name) {
          setLocName(name);
          console.log(name);
        } else {
          name += streetNumber ? streetNumber + " " : "";
          name += street ? street + " " : "";
          name += district ? district + " " : "";
          name += city ? city + " " : "";
          if (name!=='') {
            setLocName(name);
          } else  {
            setLocName("Viet Nam")
          }
          console.log(name);

        }
        
      }
    };
    useEffect(() => {
      if (flag1) {
        return;
      }
      const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Please grant location permissions");
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        // setRegion(currentLocation);
        console.log("Location:");
        console.log(currentLocation);
        let newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        };
        setFlag1(true);
        setRegion(newRegion);
      };
  
      getPermissions();
    });
  const geocode = async (address) => {
    console.log("search query:");
    console.log(address);
    const geocodedLocation = await Location.geocodeAsync(address);

    console.log("Geocoded Address:");
    console.log(geocodedLocation);
    if(geocodedLocation && geocodedLocation[0] && geocodedLocation[0].latitude ) {
      let newRegion = {
        latitude: geocodedLocation[0].latitude,
        longitude: geocodedLocation[0].longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      };
      // setFlag1(true);
      let m = {
        coordinate: {
          latitude: geocodedLocation[0].latitude,
          longitude: geocodedLocation[0].longitude,
        },
        key: 0,
      };
      setMarker(m);
      setLocName("Search: " + address);
      setRegion(newRegion);

    };
    
  };

  const reverseGeocode = async (m) => {
    if (!m) {
      return;
    }
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: m.coordinate.longitude,
      latitude: m.coordinate.latitude
    });
    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
    return reverseGeocodedAddress;
  }

  const HandleSaveLocation = async () => {
    let location = marker
   ? {
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
        name: locName
      }
    : null;
    if (location && route && route.params && route.params.task) {
      let task = route.params.task;
      task.location = location;
      console.log(task);
      // UpdateTaskFrontEnd(task);
      navigation.navigate("DetailTask" , {
        task:task
      })
    }
    

  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      region={region}
      onPress={(e) => onMapPress(e)}>
            {marker && (
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}

      ></Marker>
    )}
      </MapView>
      <TextInput
      style={{backgroundColor:'grey' ,height:"10%"}}
      placeholder='Seach location'
      value={query}
      onChangeText={(e)=> setQuery(e)}
      onSubmitEditing={(e)=>{
        console.log(query) 
        geocode(query)
      }}
      />
      <TouchableOpacity style={{backgroundColor:'teal' ,height:"10%"}}
      onPress={HandleSaveLocation}
      >
       <Text> Save Location</Text>
      </TouchableOpacity>
    </View>
  );
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
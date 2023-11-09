import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import UpdateTaskFrontEnd from "../../api/updateTaskFrontEnd";
import { SearchBar, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function AddLocation({ navigation, route }) {
  const [flag1, setFlag1] = useState(true);
  const [locName, setLocName] = useState("");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState({
    latitude: 10.861387059389518,
    longitude: 106.7656611593152,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [marker, setMarker] = useState((route.params.task.location && route.params.task.location.latitude) ? {
    coordinate: {
      latitude: route.params.task.location.latitude,
      longitude:route.params.task.location.longitude,
    },
    key: 0,
  } : "");
  // const [modalVisible, setModalVisible] = useState(false);

  // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
  const onMapPress = async (e) => {
    console.log(e.nativeEvent);
    let m = {
      coordinate: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      key: 0,
    };

    setMarker(m);
    let reverse = await reverseGeocode(m);
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
        if (name !== "") {
          setLocName(name);
        } else {
          setLocName("Viet Nam");
        }
        console.log(name);
      }
    }
  };
  useEffect(() => {
    setMarker((route.params.task.location && route.params.task.location.latitude) ? {
      coordinate: {
        latitude: route.params.task.location.latitude,
        longitude:route.params.task.location.longitude,
      },
      key: 0,
    } : "")
    const getPermissions = async () => {
      let newRegion = "";
      if(!marker && route.params.task.location && route.params.task.location.name) {
       await geocode(route.params.task.location.name);

      } else if(marker) {


      newRegion = {
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      };
      console.log("set" + JSON.stringify(newRegion));
      } else  {
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      console.log("set2");
      let currentLocation = await Location.getCurrentPositionAsync({});
      // setRegion(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
      newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0291,
      };
      }

      setFlag1(true);
      setRegion(newRegion);
    };

    getPermissions();
  },[route.params.task]);
  const geocode = async (address) => {
    const geocodedLocation = await Location.geocodeAsync(address);

    console.log("Geocoded Address:");
    console.log(geocodedLocation[0]);
    if (
      geocodedLocation &&
      geocodedLocation[0] &&
      geocodedLocation[0].latitude
    ) {
      let newRegion = {
        latitude: geocodedLocation[0].latitude,
        longitude: geocodedLocation[0].longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0291,
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
    }
  };

  const reverseGeocode = async (m) => {
    if (!m) {
      return;
    }
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: m.coordinate.longitude,
      latitude: m.coordinate.latitude,
    });
    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
    return reverseGeocodedAddress;
  };

  const HandleSaveLocation = async () => {
    if(route.params.task.gmail) {
      navigation.navigate("DetailTask", {
        task: route.params.task,
      });
      return;
    
    }
    let location = marker
      ? {
          latitude: marker.coordinate.latitude,
          longitude: marker.coordinate.longitude,
          name: locName,
        }
      : null;
    if (location && route && route.params && route.params.task) {
      let task = route.params.task;
      task.location = location;
      console.log(task);
      // UpdateTaskFrontEnd(task);
      navigation.navigate("DetailTask", {
        task: task,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => onMapPress(e)}
      >
        {marker && (
          <Marker key={marker.key} coordinate={marker.coordinate}></Marker>
        )}
      </MapView>

      <View style={styles.searchBarContainer}>
        <SearchBar

          placeholder={(route.params.task.gmail && route.params.task.location) ? route.params.task.location.name : "Type here to search location..."}
          value={query}
          onChangeText={(e) => setQuery(e)}
          onSubmitEditing={(e) => {
            console.log(query);
            geocode(query);
          }}
          lightTheme
          round
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.inputContainer}
        />
      </View>

      <View style={styles.containerAdd}>
        <TouchableOpacity
          onPress={HandleSaveLocation}
          style={styles.addLocationTask}
          containerStyle={styles.buttonAdd}
        >
          <MaterialIcons
            name={route.params.task.gmail ? "keyboard-backspace" : "add-circle"}
            size={60}
            color="purple"
            // style={{ backgroundColor: "transparent" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 40,
  },
  inputContainer: {
    backgroundColor: "white",
  },
  addLocationTask: {
    alignItems: "center",
    marginBottom: 15,
  },
  containerAdd: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

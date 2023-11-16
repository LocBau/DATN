import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

const BSMChangeAvt = ({ navigation, route, onImageuri }) => {
  const [image, setImage] = useState("");
  const sendDatatoParent = () => {
    onImageuri(image);
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Upload Image Files</Text>
      </View>
      {/* <Text>{route.params?.imageuri}</Text> */}
      <TouchableOpacity
        style={[styles.row]}
        onPress={() => {
          navigation.navigate("CameraAvt");
          setImage(route.params?.imageuri); // lay props imageuri cua tu components cameraAvt
        }}
      >
        <FontAwesome
          style={[styles.row11]}
          name="picture-o"
          size={25}
          color="purple"
        />
        <Text style={[styles.row12]}>Take a picture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.row]}
        onPress={() => {
          navigation.navigate("AccessGallery", {
            from: "ChangeAvt",
          });
        }}
      >
        <MaterialCommunityIcons
          style={[styles.row11]}
          name="image-multiple"
          size={30}
          color="purple"
        />
        <Text style={[styles.row12]}>Select From Gallery</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.row]}
        onPress={() => {
          if (!task.gmail) {
            navigation.navigate("LinkFile", {
              task: task,
            });
          }
        }}
      >
        <MaterialCommunityIcons
          style={[styles.row11]}
          name="file-image-plus-outline"
          size={30}
          color="purple"
        />
        <Text style={[styles.row12]}>Link to Files</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default BSMChangeAvt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "blue",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 12,
    borderBottomWidth: 1,
    width: "80%",
    marginHorizontal: 45,
  },
  row11: {
    flex: 1,
    alignContent: "flex-end",
  },
  row12: {
    flex: 3,
    borderBottomWidth: 0,
    fontSize: 15,
  },
});

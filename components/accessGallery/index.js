import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateTaskFrontEnd from "../../api/updateTaskFrontEnd";

export default function AccessGallery({ navigation, route }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 19.5],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  pickImage();
  const handleSave = async () => {
    console.log(image);
    let task = route.params.task;
    let arr_uri = image.split(".");
    let type = arr_uri[arr_uri.length - 1];
    let splash = image.lastIndexOf("/");

    let nameGallery = arr_uri[0].substring(splash + 1);
    let attachGallery = {
      mimeType: type,
      name: nameGallery,
      size: 1234,
      uri: image,
    };
    console.log(attachGallery);
    if (task.attachments) {
      task.attachments.push(attachGallery);
    } else {
      task.attachments = [attachGallery];
    }
    // UpdateTaskFrontEnd(task);
    navigation.navigate("DetailTask", {
      task: task,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {image && <Button title="Save image" onPress={handleSave} />}
      <Button
        title="Back to task"
        onPress={() =>
          navigation.navigate("DetailTask", {
            task: route.params.task,
          })
        }
      />
    </View>
  );
}

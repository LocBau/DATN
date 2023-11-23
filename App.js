import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Login from "./screens/Login";
import UpdateProfile from "./screens/UpdateProfile";
import Setting from "./screens/SettingProfile";
import ResetPassword from "./screens/ResetPassword";
import ForgetPass from "./screens/ForgetPass";
import Register from "./screens/Register";
import MapScreen from "./screens/Map";
import Calendar from "./screens/Calendar";
import DrawerContentComponent from "./components/drawerContent";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import testNavi from "./testNavi";
import Home from "./screens/Home";
import TaskLocation from "./screens/TaskLocation";
import { useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MicroPhone from "./screens/Microphone";
import DetailTask from "./screens/DetailTask";
import CameraScreen from "./components/camera";
import CameraScreenAvt from "./components/cameraAvt";
import AccessGallery from "./components/accessGallery";
import AddLocation from "./components/addLocation/addLocation";
import LinkFile from "./components/linkFile";
import Search from "././screens/Search";
import Stats from "./components/stats";
import Analysis from "./screens/Analysis";
import PlanningTask from "./components/planningTask";
import ItemTaskMonitor from "./components/itemTaskMonitor";
import ItemPartTask from "./components/itemPartTask";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log(token);
        await AsyncStorage.setItem("device", token.data);
      } else {
        alert("Must use physical device for Push Notifications");
        return;
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      console.log(token);
      return token;
    }
    registerForPushNotificationsAsync();
  });

  const HomeDrawerScreen = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={() => <DrawerContentComponent />}
      >
        <Drawer.Screen name="HomeDrawer" component={Home} />
        <Drawer.Screen name="Analytics" component={Analysis} />
        <Drawer.Screen name="Calendar" component={Calendar} />
        <Drawer.Screen name="TaskLocation" component={TaskLocation} />
        <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="Microphone" component={MicroPhone} />
        <Drawer.Screen name="DetailTask" component={DetailTask} />
        <Drawer.Screen name="Camera" component={CameraScreen} />
        <Drawer.Screen name="CameraAvt" component={CameraScreenAvt} />
        <Drawer.Screen name="AccessGallery" component={AccessGallery} />
        <Drawer.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="LinkFile" component={LinkFile} />
        <Drawer.Screen name="Search" component={Search} />
      </Drawer.Navigator>
    );
  };
  return (
    /*part test code is here: ... */
    // <Home
    //   onAddTask1={handleAddTask}
    //   onTasklist={tasklist}
    //   onTasklistDone={tasklistDone}
    // />

    // part using React Navigation:
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Analytics"
          // name="ItemTaskMonitor"
          // component={ItemTaskMonitor}
          component={Analysis}
          // options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={HomeDrawerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Forget Password" component={ForgetPass} />
        <Stack.Screen name="Reset Password" component={ResetPassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

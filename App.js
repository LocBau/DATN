// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect } from "react";
// import Login from "./screens/Login";
// import UpdateProfile from "./screens/UpdateProfile";
// import Setting from "./screens/SettingProfile";
// import ResetPassword from "./screens/ResetPassword";
// import ForgetPass from "./screens/ForgetPass";
// import Register from "./screens/Register";
// import MapScreen from "./screens/Map";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import testNavi from "./testNavi";
// import Home from "./screens/Home";
// import { useState } from "react";
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// const Stack = createNativeStackNavigator();

// export default function App() {

//   useEffect(()=>{
//     async function registerForPushNotificationsAsync() {
//       let token;
//       if (Device.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//           const { status } = await Notifications.requestPermissionsAsync();
//           finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//           alert('Failed to get push token for push notification!');
//           return;
//         }
//         token = await Notifications.getExpoPushTokenAsync({
//           projectId: Constants.expoConfig.extra.eas.projectId,
//         });
//         console.log(token);
//       } else {
//         alert('Must use physical device for Push Notifications');
//       }
    
//       if (Platform.OS === 'android') {
//         Notifications.setNotificationChannelAsync('default', {
//           name: 'default',
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: '#FF231F7C',
//         });
//       }
//       console.log(token);
//       return token;
//     }
//     registerForPushNotificationsAsync();

//   })
//   // const [tasklist, setTasklist] = useState([]);
//   // const [tasklistDone, settasklistDone] = useState([]);
//   // const handleAddTask = (task) => {
//   //   setTasklist([...tasklist, task]);
//   // };

//   return (
//     // <Home
//     //   onAddTask1={handleAddTask}
//     //   onTasklist={tasklist}
//     //   onTasklistDone={tasklistDone}
//     // />

//     // part using React Navigation:
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerTitleAlign: "center",
//         }}
//       >
//         {/* <Stack.Screen name='Map' component={MapScreen}/> */}
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Registration" component={Register} />
//         <Stack.Screen name="Forget Password" component={ForgetPass} />
//         <Stack.Screen name="Reset Password" component={ResetPassword} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({});


import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
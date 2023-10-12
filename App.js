import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./screens/Login";
import UpdateProfile from "./screens/UpdateProfile";
import Setting from "./screens/SettingProfile";
import ResetPassword from "./screens/ResetPassword";
import ForgetPass from "./screens/ForgetPass";
import Register from "./screens/Register";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import testNavi from "./testNavi";
import Home from "./screens/Home";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [tasklist, setTasklist] = useState([]);
  // const [tasklistDone, settasklistDone] = useState([]);
  // const handleAddTask = (task) => {
  //   setTasklist([...tasklist, task]);
  // };

  return (
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registration" component={Register} />
        <Stack.Screen name="Forget Password" component={ForgetPass} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

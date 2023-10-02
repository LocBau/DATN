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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="loginScreen" component={Login} />
          <Stack.Screen name="registerScreen" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});

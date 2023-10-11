import { View, Text, Alert} from "react-native";
import React from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from 'react';
import SignUpApi from "../../api/signupApi";
const Register = () => {
  const naviRegister = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [username, setusername] = useState("");
  const sendData = async () => {
    console.log(email);
    console.log(password);
    if (email !== "" && password !== ""  ) {
      const res = await SignUpApi( email, password);

      if (!res || res.status!== 200) {
          // console.log("noti: invalid");
          Alert.alert('Invalid', 'Invalid Login', [

            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          // AsyncStorage.setItem("user")
          return
      }


    } else {
      Alert.alert('email are required', 'email are required', [

        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <View style={styles.topLabelRow1}>
          <Text style={styles.topLabelText1}>Time</Text>
          <Text style={styles.topLabelText2}>Table</Text>
        </View>
        <Text style={styles.titleScreenText}> Registration</Text>
      </View>
      <MaterialIcons name="app-registration" size={40} color="purple" />

      <View style={styles.email}>
        <Text style={styles.emailText}>Mail Address</Text>
        <Input
          placeholder="Email Address"
          value={email}
          onChangeText={(e) =>setemail(e)}
          leftIcon={
            <MaterialCommunityIcons name="email" size={22} color="purple" />
          }
        />
      </View>

      <View style={styles.password}>
        <Text style={styles.passText}>Password</Text>
        <Input
          value={password}
          onChangeText={(e) =>setpassword(e)}
          placeholder="Password"
          leftIcon={
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="purple"
            />
          }
        />
      </View>
      <View style={styles.confirmPassword}>
        <Text style={styles.confirmPasswordText}>Confirm Password</Text>
        <Input
          placeholder="Confirm PassWord"
          leftIcon={
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="purple"
            />
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgb(179, 55, 225)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          title="Registration"
          icon={{
            name: "autorenew",
            type: "MaterialCommunityIcons",
            size: 15,
            color: "white",
          }}
          onPress={sendData}
        />
      </View>
    </View>
  );
};

export default Register;

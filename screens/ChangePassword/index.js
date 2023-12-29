import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePasswordApi from "../../api/changePasswordApi";

const ChangePassword = () => {
  const navi = useNavigation();
  const [current, setcurrent] = useState('');
  const [password, setPassword] = useState('');
  const HandleChangePassword = async () => {
    console.log(password);
    if (!password || !current) {
      Alert.alert("Error", "Password cannot be blank");
      return;
    }
    let token = await AsyncStorage.getItem('token');
    
    let res = await ChangePasswordApi(token, current, password)
    if(!res || res.status !=200) {
      Alert.alert("Error","Failed to change password");
      return;
    }
    Alert.alert("successful","password successfully changed!");

    await AsyncStorage.removeItem('reset')
    navi.navigate( "UpdateProfile"
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <Text style={styles.titleScreenText}> Change Password</Text>
      </View>
      <MaterialCommunityIcons name="lock-reset" size={40} color="purple" />
      <View style={styles.newpass}>
        <Text style={styles.nameText}>Current Password</Text>
        <Input
          placeholder="Current Password"
          value = {current}
          onChangeText={setcurrent}
          autoCapitalize="none"
          secureTextEntry={true}
          leftIcon={
            <MaterialCommunityIcons
              name="onepassword"
              size={24}
              color="purple"
            />
          }
        />
      </View>
      <View style={styles.confirmPassword}>
      <Text style={styles.nameText}>New Password</Text>
        <Input
          placeholder="New Password"
          value = {password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          leftIcon={
            <MaterialCommunityIcons
              name="onepassword"
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
          onPress={HandleChangePassword}
          title="Change Password"
          icon={{
            name: "autorenew",
            type: "MaterialCommunityIcons",
            size: 15,
            color: "white",
          }}
        />
        
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
        onPress={()=> {navi.navigate('UpdateProfile')}}
        title="Back to Profile"
        icon={{
          name: "autorenew",
          type: "MaterialCommunityIcons",
          size: 15,
          color: "white",
        }}
      />
      </View>
    </View>
  );
};

export default ChangePassword;

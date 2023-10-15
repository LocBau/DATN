import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";
import ResetPasswordApi from "../../api/resetPasswordApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPassword = () => {
  const navi = useNavigation();
  const [password, setPassword] = useState('');
  const HandleResetPassword = async () => {
    console.log(password);
    if (!password) {
      Alert.alert("Error", "Password cannot be blank");
      return;
    }
    let email = await AsyncStorage.getItem("reset");
    
    let res = await ResetPasswordApi(email,password);
    if(!res || res.status !=200) {
      Alert.alert("Error","Failed to reset password");
      return;
    }
    Alert.alert("successful","password successfully reset");

    await AsyncStorage.removeItem('reset')
    navi.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <Text style={styles.titleScreenText}> Reset Password</Text>
      </View>
      <MaterialCommunityIcons name="lock-reset" size={40} color="purple" />
      <View style={styles.newpass}>
        <Text style={styles.nameText}>New Password</Text>
        <Input
          placeholder="New password"
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
      <View style={styles.confirmPassword}>
        <Text style={styles.confirmPasswordText}>Confirm Password</Text>
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          autoCapitalize="none"
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
          onPress={HandleResetPassword}
          title="Reset Password"
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

export default ResetPassword;

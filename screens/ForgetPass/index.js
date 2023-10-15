import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import styles from "./style";
import ForgetPasswordApi from "../../api/forgetPasswordApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPass = () => {
  const navi = useNavigation();
  const [email, setEmail] = useState('');
  const HandleForgetPass = async () => {
    console.log(email);
    if(!email) {
      Alert.alert("Error","email cannot be blank");
      return;
    }

    let res = await ForgetPasswordApi(email);
    if (!res || res.status != 200) {
      Alert.alert("Error","email are not registered");
      return;
    }
    await AsyncStorage.setItem("reset",email);
    Alert.alert("info", "please check your mailbox before reset password");
    navi.reset({
      index: 0,
      routes: [{ name: "Reset Password" }],
    })

  }
  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <View style={styles.topLabelRow1}>
          <Text style={styles.topLabelText1}>Time</Text>
          <Text style={styles.topLabelText2}>Table</Text>
        </View>
        <Text style={styles.titleScreenText}> Forget Password</Text>
      </View>
      <MaterialCommunityIcons name="lock-reset" size={40} color="purple" />
      <View style={styles.newpass}>
        <Text style={styles.nameText}>Mail Address</Text>
        <Input
          placeholder="Email Address"
          value = {email}
          onChangeText={(e)=>{setEmail(e)}}
          autoCapitalize="none"
          leftIcon={
            <MaterialCommunityIcons name="email" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={HandleForgetPass}
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

export default ForgetPass;

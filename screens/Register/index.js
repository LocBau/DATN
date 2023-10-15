import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import SignUpApi from "../../api/signupApi";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const naviRegister = useNavigation();
  const handleRegister = async () => {
    if(email =="" && password == "") {
      Alert.alert("Invalid input","email or password cannot be blank");
      return;
    }
    console.log(password);
    console.log(email);
    let res = await SignUpApi(email, password);
    if (!res || res.status!==200) {
      Alert.alert("Error","Email already used");
      return;
    }
    Alert.alert("Email verification","Please check your mail and verify", [{
      text: 'OK',
      onPress: () => naviRegister.navigate("Login"),
      style: 'OK',
    },]);
    

  }
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
          value = {email}
          autoCapitalize='none'
          onChangeText={(e)=>setEmail(e)}
          leftIcon={
            <MaterialCommunityIcons name="email" size={22} color="purple" />
          }
        />
      </View>

      <View style={styles.password}>
        <Text style={styles.passText}>Password</Text>
        <Input
          placeholder="Password"
          autoCapitalize='none'
          secureTextEntry={true}
          value = {password}
          onChangeText={(e)=>setPassword(e)}
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
          autoCapitalize='none'
          secureTextEntry={true}
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
          onPress={handleRegister}
          title="Registration"
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

export default Register;

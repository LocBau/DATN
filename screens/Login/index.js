import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import LoginApi from "../../api/loginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  // const naviRegister = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleLogin = async () => {
    console.log(email);
    console.log(password);
    let device = await AsyncStorage.getItem('device');
    let from = await AsyncStorage.getItem('from');
    console.log(device);
    if (email == "" && password == "") {
      Alert.alert("Invalid input", "email or password cannot be blank");
      return;
    }
    let res = await LoginApi(email, password, device, from);
    if (!res || res.status !== 200) {
      Alert.alert("Error", "Server Error");
      return;
    }
    await AsyncStorage.setItem("user", res.data.user);
    await AsyncStorage.setItem("token", res.data.token);
    if (res.data.name ) await AsyncStorage.setItem("name", res.data.name);
    if (res.data.phone ) await AsyncStorage.setItem("phone", res.data.phone);

    await AsyncStorage.setItem("settings",JSON.stringify(res.data.settings))
    if (res.data.google_ref )await AsyncStorage.setItem("google_ref",JSON.stringify(res.data.google_ref))
    await AsyncStorage.removeItem("flag");
    await AsyncStorage.removeItem("flag1");
    // console.log(a);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    // navigation.navigate("Home", {}, { replace: true });
    // navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.topLabelRow1}>
          <Text style={styles.topLabelText1}>Time</Text>
          <Text style={styles.topLabelText2}>Table</Text>
        </View>
        <Text style={styles.topLabelText3}>Login</Text>
        <MaterialIcons name="login" size={40} color="purple" />

        <View style={styles.topEmail}>
          <Text style={styles.emailText}>Mail Address</Text>
          <Input
            placeholder="Email Address"
            autoCapitalize="none"
            value={email}
            onChangeText={(e) => setEmail(e)}
            leftIcon={
              <MaterialCommunityIcons name="email" size={22} color="purple" />
            }
          />
        </View>

        <View style={styles.password}>
          <Text style={styles.passText}>Password</Text>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            leftIcon={
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={24}
                color="purple"
              />
            }
          />
          <Text
            style={styles.passForgot}
            onPress={() => navigation.navigate("Forget Password")}
          >
            Forgot your password?
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            onPress={HandleLogin}
            // onPress={() => naviRegister.navigate("Home")}
            // onPress={() =>
            //   naviRegister.reset({
            //     index: 0,
            //     routes: [{ name: "Home" }],
            //   })
            // }

            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              marginTop: 10,
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
            title="Login"
            icon={{
              name: "login",
              type: "MaterialCommunityIcons",
              size: 15,
              color: "white",
            }}
          />
        </View>

        <View style={styles.horizontalLine}></View>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.bottomLabelRow1}>
          <Text style={styles.bottomLabelRow1Text}>No account yet?</Text>
        </View>

        <View style={styles.topEmail}>
          <Text style={styles.emailText}>Mail Address</Text>
          <Input
            placeholder="Email Registration"
            leftIcon={
              <MaterialCommunityIcons name="email" size={22} color="purple" />
            }
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate("Registration")}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              marginTop: 10,
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
            title="Continue"
            icon={
              // name: "account-plus",
              // type: "MaterialCommunityIcons",
              // size: 15,
              // color: "white",
              <MaterialCommunityIcons
                name={"account-plus-outline"}
                marginRight={10}
                size={22}
                color="white"
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

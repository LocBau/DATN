import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const naviRegister = useNavigation();
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
            leftIcon={
              <MaterialCommunityIcons name="email" size={22} color="purple" />
            }
          />
        </View>

        <View style={styles.password}>
          <Text style={styles.passText}>Password</Text>
          <Input
            placeholder="Password"
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
            onPress={() => naviRegister.navigate("Forget Password")}
          >
            Forgot your password?
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => naviRegister.navigate("Home")}
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
            onPress={() => naviRegister.navigate("Registration")}
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

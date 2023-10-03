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
          <Text style={styles.emailLabel}> Mail address</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.topPass}>
          <Text style={styles.passLabel}> Password</Text>
          <TextInput style={styles.textInput}></TextInput>
          <Text
            style={styles.passForgot}
            onPress={() => naviRegister.navigate("Forget Password")}
          >
            Forgot your password?
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.horizontalLine}></View>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.bottomLabelRow1}>
          <Text style={styles.bottomLabelRow1Text}>No account yet?</Text>
        </View>
        <View style={styles.topEmail}>
          <Text style={styles.emailLabel}> Mail address</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>
        <TouchableOpacity onPress={() => naviRegister.navigate("Registration")}>
          <View style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

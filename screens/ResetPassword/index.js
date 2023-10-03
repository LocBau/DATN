import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";

const ResetPassword = () => {
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

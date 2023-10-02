import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

const UpdateProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <Text style={styles.titleScreenText}> Update Profile</Text>
      </View>
      <Avatar
        size={128}
        rounded
        containerStyle={{ marginVertical: 10 }}
        source={{
          uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
        }}
      />
      <Text style={styles.avatarText}>Bau Loc</Text>
      <View style={styles.name}>
        <Text style={styles.nameText}>Name</Text>
        <Input
          placeholder="Tran Bau Loc"
          leftIcon={
            <MaterialCommunityIcons name="account" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.email}>
        <Text style={styles.emailText}>Email</Text>
        <Input
          placeholder="loc.tran86@hcmut.edu.vn"
          leftIcon={
            <MaterialCommunityIcons name="email" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.phone}>
        <Text style={styles.phoneText}>Phone Number</Text>
        <Input
          placeholder="+84.123.456.789"
          leftIcon={
            <MaterialCommunityIcons name="email" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.changePass}>
        <Text style={styles.changePasstext}>Password</Text>
        <Text style={styles.changePasstextlink}>Change password</Text>
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
          title="Save Changes"
          icon={{
            name: "save",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
        />
      </View>
    </View>
  );
};

export default UpdateProfile;

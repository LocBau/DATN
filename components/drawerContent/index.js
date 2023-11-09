import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

import { Title, Caption } from "react-native-paper";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const Drawer = createDrawerNavigator();
const DrawerContentComponent = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("example@gmail.com");
  const [name, setName] = useState('#user3756');
  useEffect(() => {
    async function getUser() {
      let u = await AsyncStorage.getItem("user");
      let n = await AsyncStorage.getItem("name");
      setUser(u);
      
      if(n) setName(n);
    }
    getUser();
  });
  return (
    <DrawerContentScrollView style={styles.drawerstyle}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection1}>
          <Avatar
            size={46}
            rounded
            containerStyle={{ marginVertical: 10 }}
            source={{
              uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
            }}
          />
          <View style={styles.userInfoSection2}>
            <Title style={styles.title}>{name}</Title>
            <Caption style={styles.caption}>{user}</Caption>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={() => (
              <MaterialCommunityIcons name="home" size={22} color="purple" />
            )}
            label="Home"
            onPress={() => {
              navigation.navigate("HomeDrawer");
            }}
          />
          <DrawerItem
            icon={() => <Ionicons name="analytics" size={22} color="purple" />}
            label="Analytics"
            onPress={() => {
              navigation.navigate("Analytics");
            }}
          />
          <DrawerItem
            icon={() => (
              <MaterialCommunityIcons
                name="calendar"
                size={22}
                color="purple"
              />
            )}
            label="Calendar"
            onPress={() => {
              navigation.navigate("Calendar");
            }}
          />
          <DrawerItem
            icon={() => <Ionicons name="location" size={22} color="purple" />}
            label="Task Location"
            onPress={() => {
              navigation.navigate("TaskLocation", {
                task: null,
              });
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={() => <Ionicons name="settings" size={22} color="purple" />}
            label="Setting"
            onPress={() => {
              navigation.navigate("Setting");
            }}
          />
          <DrawerItem
            icon={() => (
              <MaterialCommunityIcons
                name="account-cog"
                size={22}
                color="purple"
              />
            )}
            label="Profile"
            onPress={() => {
              navigation.navigate("UpdateProfile");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={() => <Ionicons name="search" size={22} color="purple" />}
            label="Search Task"
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
        </Drawer.Section>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="account-tie-voice"
              size={22}
              color="purple"
            />
          )}
          label="Voice Command"
          onPress={() => {
            navigation.navigate("Microphone");
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContentComponent;

const styles = StyleSheet.create({
  drawerstyle: {
    flex: 1,
    backgroundColor: "rgb(224, 236, 217)",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection1: {
    paddingLeft: 10,
    flexDirection: "row",
  },
  userInfoSection2: {
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 15,
  },
});

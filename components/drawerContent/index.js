import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Title, Caption } from "react-native-paper";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerSection } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const DrawerContentComponent = () => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar
            size={32}
            rounded
            containerStyle={{ marginVertical: 10 }}
            source={{
              uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
            }}
          />
          <Title style={styles.title}>John Doe</Title>
          <Caption style={styles.caption}>@johndoe</Caption>
        </View>

        <DrawerSection style={styles.drawerSection}>
          <DrawerItem
            icon={
              <MaterialCommunityIcons name="email" size={22} color="purple" />
            }
            label="Home"
            onPress={() => {}}
          />
          <DrawerItem
            icon={
              <MaterialCommunityIcons name="email" size={22} color="purple" />
            }
            label="Profile"
            onPress={() => {}}
          />
        </DrawerSection>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContentComponent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
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

import { View, Text, StyleSheet } from "react-native";
import { React, useEffect, useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const SyncedEmail = ({item}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>SyncedEmail</Text> */}
      <View style={styles.frame}>
        <View style={styles.viewIcon}>
          <Avatar
            size={35}
            rounded
            containerStyle={{ marginHorizontal: 10 }}
            // source={{
            //   uri: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            // }}
            source={require("../../assets/GGcalendar-96.png")}
          />
        </View>

        <View style={styles.viewText}>
          <Text style={styles.frameText}>{item.email}</Text>
        </View>
        <View style={styles.viewBtAdd}>
          <MaterialCommunityIcons
            name="link-variant-remove"
            size={25}
            color="purple"
            onPress={() => {
              console.log("xoa acc ggcalendar");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SyncedEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  frame: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2,
    width: "95%",
    height: 40,
    backgroundColor: "#efefef",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 25,
      },
    }),
  },
  viewIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewText: {
    flex: 6,
    justifyContent: "center",
  },
  viewBtAdd: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

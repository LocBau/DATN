import { View, Text, StyleSheet } from "react-native";
import { React, useEffect, useState } from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const SyncedEmail = ({ item }) => {
  const handleRemoveAcc = () => {
    console.log(item);
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Synced Email</Text> */}
      <View style={styles.frame}>
        <View style={styles.viewIcon}>
          <MaterialCommunityIcons name="account" size={25} color="purple" />
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
              handleRemoveAcc();
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
    marginVertical: 5,
  },
  frame: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 2,
    width: "95%",
    height: 40,
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
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
  frameText: {
    fontSize: 16,
  },
  viewBtAdd: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text } from "react-native";
import { React, useEffect, useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateSetingApi from "../../api/updateSettingApi";
const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  useEffect(()=> {
    async function fetchSettings()  {
      let settings = await AsyncStorage.getItem('settings');
      let flag1 = await AsyncStorage.getItem('flag1');
      console.log("setting"+settings);
      if(settings && !flag1){
        try {
          
          settings = JSON.parse(settings);
          setAppNotification(settings.appNotification);
          setEmailNotification(settings.emailNotification);
          await AsyncStorage.setItem("flag1","true");
        } catch (e) {
          
        }
      }

    }
    fetchSettings();
  })
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleAppNotification = async () => {
    let state = appNotification;
    let settings = await AsyncStorage.getItem('settings');
    let device = await AsyncStorage.getItem('device');
    let token = await AsyncStorage.getItem('token');
    if (settings) {
      try {
        settings= JSON.parse(settings);
        settings.appNotification = !state
        await AsyncStorage.setItem("settings",JSON.stringify(settings))
        setAppNotification((previousState)=>!previousState)
        UpdateSetingApi(token, settings, device);

      } catch (e) {
        
      }
    }
  }
  const toggleEmailNotification  = async () => {
    let state = emailNotification;
    let settings = await AsyncStorage.getItem('settings');
    let device = await AsyncStorage.getItem('device');
    let token = await AsyncStorage.getItem('token');
    if (settings) {
      try {
        settings= JSON.parse(settings);
        settings.emailNotification = !state
        await AsyncStorage.setItem("settings",JSON.stringify(settings))
        setEmailNotification((previousState)=>!previousState)
        UpdateSetingApi(token, settings, device);

      } catch (e) {
        
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Settings </Text>
        <MaterialCommunityIcons
          name="account-settings"
          size={40}
          color="purple"
        />
      </View>
      <View style={styles.editProfile}>
        <View style={styles.viewAvatar}>
          <Avatar
            size={64}
            rounded
            containerStyle={{ marginLeft: 20 }}
            source={{
              uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
            }}
          />
        </View>
        <View style={styles.viewTextUser}>
          <Text style={styles.usersName}>Tran Bau Loc</Text>
          <Text style={styles.email}>loc.tran86@hcmut.edu.vn</Text>
        </View>
        <View style={styles.viewButton}>
          <Button
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgb(179, 55, 225)",
              borderColor: "transparent",
              borderWidth: 1,
              borderRadius: 10,
              type: "outline",
            }}
            containerStyle={{
              width: 80,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            title="Edit"
            icon={{
              name: "edit",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
          />
        </View>
      </View>
      <View style={styles.editGroup}>
        <View>
          <Text style={styles.titleFrame}>Manage Group</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.viewIcon}>
            <Avatar
              size={40}
              rounded
              containerStyle={{ marginLeft: 20 }}
              source={{
                uri: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              }}
            />
          </View>

          <View style={styles.viewText}>
            <Text style={styles.frameText}>Back Khoa Group</Text>
          </View>
          <View style={styles.viewSwitch}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
      <View style={styles.noti}>
        <View>
          <Text style={styles.titleFrame}>Notification</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.viewIcon}>
            <MaterialIcons
              name="circle-notifications"
              size={40}
              color="purple"
            />
          </View>

          <View style={styles.viewText}>
            <Text style={styles.frameText}>Turn on</Text>
          </View>

          <View style={styles.viewSwitch}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={appNotification ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAppNotification}
              value={appNotification}
            />
          </View>
        </View>
        <View style={styles.frame}>
          <View style={styles.viewIcon}>
            <MaterialCommunityIcons
              name="email-alert"
              size={32}
              color="purple"
            />
          </View>

          <View style={styles.viewText}>
            <Text style={styles.frameText}>Reminder email</Text>
          </View>

          <View style={styles.viewSwitch}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={emailNotification ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEmailNotification}
              value={emailNotification}
            />
          </View>
        </View>
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

export default Setting;

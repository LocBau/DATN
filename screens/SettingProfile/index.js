import { View, Text, FlatList } from "react-native";
import { React, useEffect, useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateSetingApi from "../../api/updateSettingApi";
import SyncedEmail from "../../components/syncedEmail";
import * as Linking from "expo-linking";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import GetUserProfileApi from "../../api/getuserprofileApi";
import { serverUrl } from "../../api/link";

const Setting = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [user, setUser] = useState("example@gmail.com");
  const [name, setName] = useState("#user3756");
  const isFocused = useIsFocused();
  const [refresh, setrefresh] = useState(false);
  const [googleSyncEmail, setGoogleSyncEmail] = useState([]);
  useEffect(() => {
    async function fetchSettings() {
      let settings = await AsyncStorage.getItem("settings");
      let user = await AsyncStorage.getItem("user");
      let n = await AsyncStorage.getItem("name");
      let google = await AsyncStorage.getItem("google_ref");
      if (refresh) {
        let res = await GetUserProfileApi();
        if (res.data.name) await AsyncStorage.setItem("name", res.data.name);
        if (res.data.user) await AsyncStorage.setItem("user", res.data.user);

        if (res.data.settings)
          await AsyncStorage.setItem(
            "settings",
            JSON.stringify(res.data.settings)
          );
        if (res.data.google_ref)
          await AsyncStorage.setItem(
            "google_ref",
            JSON.stringify(res.data.google_ref)
          );
        settings = JSON.stringify(res.data.settings);
        user = res.data.user;
        n = res.data.name;
        google = JSON.stringify(res.data.google_ref);
      } else {
        settings = await AsyncStorage.getItem("settings");
        user = await AsyncStorage.getItem("user");
        n = await AsyncStorage.getItem("name");
        google = await AsyncStorage.getItem("google_ref");
      }

      if (google) {
        google = JSON.parse(google);
        if (google) {
          let google_array = [];
          for (const k in google) {
            if (Object.hasOwnProperty.call(google, k)) {
              const e = google[k];
              // console.log(k);
              google_array.push(e);
            }
          }
          setGoogleSyncEmail(google_array);
          console.log(googleSyncEmail);
        }
      }

      if (n) setName(n);
      setUser(user);
      let flag1 = await AsyncStorage.getItem("flag1");
      console.log("setting" + settings);
      if (settings && !flag1) {
        try {
          settings = JSON.parse(settings);
          setAppNotification(settings.appNotification);
          setEmailNotification(settings.emailNotification);
          await AsyncStorage.setItem("flag1", "true");
        } catch (e) {}
      }
    }
    setrefresh(false);
    fetchSettings();
  }, [isFocused, refresh]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleAppNotification = async () => {
    let state = appNotification;
    let settings = await AsyncStorage.getItem("settings");
    let device = await AsyncStorage.getItem("device");
    let token = await AsyncStorage.getItem("token");
    if (settings) {
      try {
        settings = JSON.parse(settings);
        settings.appNotification = !state;
        await AsyncStorage.setItem("settings", JSON.stringify(settings));
        setAppNotification((previousState) => !previousState);
        UpdateSetingApi(token, settings, device);
      } catch (e) {}
    }
  };
  const toggleEmailNotification = async () => {
    let state = emailNotification;
    let settings = await AsyncStorage.getItem("settings");
    let device = await AsyncStorage.getItem("device");
    let token = await AsyncStorage.getItem("token");
    if (settings) {
      try {
        settings = JSON.parse(settings);
        settings.emailNotification = !state;
        await AsyncStorage.setItem("settings", JSON.stringify(settings));
        setEmailNotification((previousState) => !previousState);
        UpdateSetingApi(token, settings, device);
      } catch (e) {}
    }
  };
  const renderItem = ({ item }) => {
    return <SyncedEmail item={item} />;
  };

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
          <Text style={styles.usersName}>{name}</Text>
          <Text style={styles.email}>{user}</Text>
        </View>
        <View style={styles.viewButton}>
          <Button
            // onPress={() => setrefresh(true)}
            iconContainerStyle={{ marginRight: 5 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgb(179, 55, 225)",
              borderColor: "transparent",
              borderWidth: 1,
              borderRadius: 10,
              type: "outline",
            }}
            containerStyle={{
              width: "auto",
              marginRight: 5,
              marginVertical: 10,
            }}
            title="Logout"
            icon={{
              name: "logout",
              type: "MaterialIcons",
              size: 16,
              color: "white",
            }}
          />
        </View>
      </View>
      <View style={styles.editCalendar}>
        <View>
          <Text style={styles.titleFrame}>Google Calendar</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.frameItem}>
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
              <Text style={styles.frameText}>Add account to sync</Text>
            </View>
            <View style={styles.viewSwitch}>
              <MaterialCommunityIcons
                name="autorenew"
                size={28}
                color="purple"
                marginHorizontal={5}
                onPress={() => setrefresh(true)}
              />
              <MaterialCommunityIcons
                name="link-plus"
                size={30}
                color="purple"
                marginHorizontal={5}
                onPress={() => {
                  console.log("sync " + user);
                  setrefresh(true);
                  Linking.openURL(`${serverUrl}/auth/google?appemail=${user}`);
                }}
              />
            </View>
          </View>
          <View style={styles.viewlistGG}>
            <Text style={styles.titleListFrame}>Accounts Synced:</Text>
            <FlatList
              data={googleSyncEmail}
              keyExtractor={(item) => item.email}
              renderItem={renderItem}
            ></FlatList>
          </View>
        </View>
      </View>

      <View style={styles.editGroup}>
        <View>
          <Text style={styles.titleFrame}>Manage Group</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.frameItem}>
            <View style={styles.viewIcon}>
              <Avatar
                size={30}
                rounded
                containerStyle={{ marginLeft: 20 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                }}
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.frameText}>Name Group</Text>
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
      </View>
      <View style={styles.noti}>
        <View>
          <Text style={styles.titleFrame}>Notification</Text>
        </View>
        <View style={styles.frame}>
          <View style={styles.frameItem}>
            <View style={styles.viewIcon}>
              <MaterialIcons
                name="circle-notifications"
                size={30}
                color="purple"
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.frameText}>Turn on device</Text>
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
          <View style={styles.frameItem}>
            <View style={styles.viewIcon}>
              <MaterialCommunityIcons
                name="email-alert"
                size={25}
                color="purple"
              />
            </View>

            <View style={styles.viewText}>
              <Text style={styles.frameText}>Reminder by email</Text>
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
          onPress={() => navigation.navigate("HomeDrawer")}
        />
      </View>
    </View>
  );
};

export default Setting;

import { View, Text, Touchable, useRe } from "react-native";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateUserApi from "../../api/updateUserApi";
import { useIsFocused } from "@react-navigation/native";
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import BSMChangeAvt from "../../components/bsmChangeAvt";

const UpdateProfile = ({ navigation, task, route }) => {
  const [user, setUser] = useState("example@gmail.com");
  const [name, setName] = useState("#user3756");
  const [phone, setPhone] = useState("0989717007");
  const [imageuri, setImageuri] = useState(
    "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
  );
  let isFocused = useIsFocused();
  console.log("da ve:", uri);

  useEffect(() => {
    console.log("dfdffd");
    async function getUser() {
      let u = await AsyncStorage.getItem("user");
      let n = await AsyncStorage.getItem("name");
      let p = await AsyncStorage.getItem("phone");
      let a = await AsyncStorage.getItem("avatar");
      if (a) setImageuri(a);
      if (p) setPhone(p);
      if (n) setName(n);
      setUser(u);
    }
    getUser();
    const setAvatar = async () => {
      if (route.params?.uri) {
        console.log("vo vong lap");
        setImageuri(route.params.uri);
        await AsyncStorage.setItem("avatar", route.params.uri);
      }
      console.log("dffddf dsfsfsf :", route.params?.uri);
      console.log("dffv  imageuri :", imageuri);
    };
    setAvatar();
  }, [isFocused]);

  const handleSaveChange = async () => {
    let token = await AsyncStorage.getItem("token");
    let res = await UpdateUserApi(token, name, phone);
    if (res.status == 200) {
      if (name) await AsyncStorage.setItem("name", name);
      if (phone) await AsyncStorage.setItem("phone", phone);
      alert("update success");
    } else {
      alert("Error");
    }
  };
  const handleItemSelect = (item) => {
    // if (route.params.task.gmail) return;
    // setreminder(null);
    // setdue(null);
    // setRepeat(item);
  };
  /////// BottomSheetModal ////////////
  //ref
  const bottomSheetModalChangeAvtRef = useRef(null);
  // state
  const [isSheetClosedChangeAvt, setIsSheetClosedChangeAvt] = useState(true);
  // variables
  const snapPointsChangeAvt = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressChangeAvt = useCallback(() => {
    // console.log("press" + route.params.task.gmail);
    // if (route.params.task.gmail) return;
    // setIsSheetClosedChangeAvt(false);
    bottomSheetModalChangeAvtRef.current?.present();
  }, []);
  /////// BottomSheetModal ////////////
  let uri = "";
  // const sendDataFromBottomSheet = (data) => {
  //   setImageuri(data);
  //   console.log("quay tro lai updateprofile:", imageuri);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <Text style={styles.titleScreenText}> Update Profile</Text>
      </View>
      <Avatar
        size={128}
        rounded
        containerStyle={{ marginVertical: 10 }}
        // source={{
        //   uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
        // }}
        source={{ uri: imageuri }}
        onPress={handlePresentModalPressChangeAvt}
      />

      <Text style={styles.avatarText}>{name}</Text>
      <View style={styles.name}>
        <Text style={styles.nameText}>Name</Text>
        <Input
          placeholder={name}
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          leftIcon={
            <MaterialCommunityIcons name="account" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.email}>
        <Text style={styles.emailText}>Email</Text>
        <Input
          placeholder={user}
          value={user}
          disabled={true}
          leftIcon={
            <MaterialCommunityIcons name="email" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.phone}>
        <Text style={styles.phoneText}>Phone Number</Text>
        <Input
          placeholder="+84.123.456.789"
          onChangeText={(e) => {
            setPhone(e);
          }}
          value={phone}
          leftIcon={
            <MaterialCommunityIcons name="email" size={24} color="purple" />
          }
        />
      </View>
      <View style={styles.changePass}>
        <Text style={styles.changePasstext}>Password</Text>
        <TouchableOpacity onPress={()=> {
            navigation.navigate("ChangePassword");
          }}>
        <Text style={styles.changePasstextlink}>

          Change password

        </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Button
          onPress={handleSaveChange}
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
      <BottomSheetModalProvider>
        <View style={styles.containerBottomSheetChangeAvt}>
          <BottomSheetModal
            ref={bottomSheetModalChangeAvtRef}
            index={1}
            snapPoints={snapPointsChangeAvt}
            // handleHeight={0}
            enableDismissOnClose={true}
            // onChange={sendDataFromBottomSheet}
            // onClose={sendDataFromBottomSheet}
          >
            <BSMChangeAvt
              navigation={navigation}
              route={route}
              // onImageuri={sendDataFromBottomSheet}
            />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default UpdateProfile;

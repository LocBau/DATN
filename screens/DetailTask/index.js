import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Avatar,
  Button,
  Switch,
  Input,
  Icon,
  Tile,
} from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import BSMReminder from "../../components/bsmReminder";
import { bs } from "date-fns/locale";
const DetailTask = () => {
  const bottomSheetModalRef1 = useRef();
  const [reminder, setReminder] = useState(false);
  const showBSMReminder = () => {
    setReminder(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitleScreen}>
        <Text style={styles.titleScreenText}> Detail Task</Text>
        <MaterialCommunityIcons name="subtitles" size={40} color="purple" />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.titleTask}>
          <Input
            color="blue"
            placeholder="Title task"
            leftIcon={
              <MaterialCommunityIcons
                name="format-title"
                size={24}
                color="purple"
              />
            }
          />
        </View>

        <TouchableOpacity style={styles.reminder} onPress={showBSMReminder}>
          <MaterialIcons
            name="circle-notifications"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Reminder me</Text>
        </TouchableOpacity>

        <View style={styles.dueto}>
          <MaterialCommunityIcons
            name="calendar"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Due to</Text>
        </View>
        <View style={styles.repeat}>
          <MaterialCommunityIcons
            name="repeat"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Repeat</Text>
        </View>
        <View style={styles.attackfile}>
          <MaterialCommunityIcons
            name="attachment"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Attach File</Text>
        </View>
        <View style={styles.note}>
          <MaterialCommunityIcons
            name="note-plus-outline"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <TextInput multiline> Note</TextInput>
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
            title="Save Task"
            icon={{
              name: "save",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
          />
        </View>
        <BSMReminder onPressed={reminder} />
      </View>
    </View>
  );
};
export default DetailTask;

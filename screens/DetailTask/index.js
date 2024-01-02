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
  Alert,
  Platform,
  FlatList,
  Keyboard,
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
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import styles from "./style";
import BSMReminder from "../../components/bsmReminder";
import BSMDueTo from "../../components/bsmDueTo";
import BSMRepeat from "../../components/bsmRepeat";
import BSMAttach from "../../components/bsmAttachFile";
import { bs } from "date-fns/locale";
import UpdateTaskFrontEnd from "../../api/updateTaskFrontEnd";
import { useIsFocused } from "@react-navigation/native";
import DeleteTaskFrontEnd from "../../api/deleteTaskFrontEnd";
import { setStatusBarBackgroundColor } from "expo-status-bar";
const DetailTask = ({ route, navigation }) => {
  /**
   * code using for BottomSheetModalReminder:
   */
  // ref;
  const isFocused = useIsFocused();

  useEffect(() => {
    setTask(route.params.task);
    setLocation(route.params.task.location);
    setRepeat(route.params.task.repeat);
    setreminder(route.params.task.reminder);
    setdue(route.params.task.due);
    setTitle(route.params.task.title);
    setNote(route.params.task.note);
    setAttachments(route.params.task.attachments);
    setIsGoogle(route.params.task.gmail);
    setStatus(route.params.task.done);

    console.log("eff" + isGoogle);
    console.log("detail focus" + isFocused);
  }, [isFocused]);

  const [status, setStatus] = useState(route.params.task.done);
  const [task, setTask] = useState(route.params.task);
  const [isGoogle, setIsGoogle] = useState(route.params.task.gmail);
  console.log("isgoogle" + isGoogle);
  const [note, setNote] = useState(route.params.note);
  const [title, setTitle] = useState(route.params.task.title);
  const [due, setdue] = useState(route.params.task.due);
  const [reminder, setreminder] = useState(route.params.task.reminder);
  const [location, setLocation] = useState(route.params.task.location);
  const [repeat, setRepeat] = useState(route.params.task.repeat);
  const [attachments, setAttachments] = useState(route.params.task.attachments);
  const [noteFocus, setNoteFocus] = useState(false);
  const convertRepeat = (rep) => {
    if (!rep || !rep.type || !rep.hour) return "Not set";
    if (rep.type == "Daily") {
      let t = new Date(rep.hour);
      return "Daily: " + t.toTimeString().split(" ")[0];
    }
    if (rep.type == "Weekly") {
      let t = new Date(rep.hour);
      return "Weekly: Every Monday " + t.toTimeString().split(" ")[0];
    }
    if (rep.type == "Monthly") {
      let t = new Date(rep.hour);
      return "Monthly: Every 15th " + t.toTimeString().split(" ")[0];
    }
  };

  const convertDate = (date) => {
    console.log(date);
    if (!date) return "Not set";
    if (typeof date == "string") {
      let d = new Date(date);
      let t = new Date(date);
      return t.toLocaleDateString() + " - " + t.toTimeString().split(" ")[0];
    }
  };
  //ref
  const bottomSheetModalReminderRef = useRef(null);
  // state
  const [isSheetClosedReminder, setIsSheetClosedReminder] = useState(true);
  // variables
  const snapPointsReminder = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressReminder = useCallback(() => {
    console.log("press" + route.params.task.gmail);
    if (route.params.task.gmail) return;
    setIsSheetClosedReminder(false);
    bottomSheetModalReminderRef.current?.present();
  }, []);

  const handleSaveTask = async () => {
    if (route.params.task.gmail) return;
    let update = task;
    update.done = status;
    update.title = title;
    update.due = due;
    update.note = note;
    update.location = location;
    update.repeat = repeat;
    update.reminder = reminder;
    update.attachments = attachments;
    await UpdateTaskFrontEnd(update);
    console.log("saved");
    navigation.navigate("HomeDrawer", {
      task: null,
    });
  };

  const handleItemSelectReminder = (item) => {
    if (route.params.task.gmail) return;
    // if (!due) {
    //   alert("cannot set reminder if due is not set");
    //   return;
    // }
    // let check = new Date(due);
    // if (check.getTime() - item.getTime() <= 360000) {
    //   console.log(check.getTime());
    //   console.log(item.getTime());
    //   console.log(check.getTime() - item.getTime());
    //   alert("cannot set reminder prior less than 1 hour");
    //   return;
    // }
    // if (check.getTime() - Date.now() <= 0) {
    //   alert("cannot set reminder when due is passed");
    //   return;
    // }

    // if (item.getTime() - Date.now() <= 0) {
    //   alert("cannot set reminder when prior than moment");
    //   return;
    // }
    console.log(item.toISOString());
    setreminder(item.toISOString());
  };
  /**
   * code using for BottomSheetModalReminder:
   *
   */
  /**code using for BottomSheetModalDueTo:*/
  // ref;
  const bottomSheetModalDueToRef = useRef(null);
  // state
  const [isSheetClosedDueto, setIsSheetClosedDueto] = useState(true);
  // variables
  const snapPointsDueTo = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressDueTo = useCallback(() => {
    console.log("press" + route.params.task.gmail);
    if (route.params.task.gmail) return;
    setIsSheetClosedDueto(false);
    bottomSheetModalDueToRef.current?.present();
  }, []);

  const [selectedItemDueTo, setSelectedItemDueTo] = useState(null);

  const handleItemSelectDueTo = (item) => {
    if (route.params.task.gmail) return;
    console.log(item.toISOString());
    setdue(item.toISOString());
  };
  /*code using for BottomSheetModalDueTo:*/

  /**code using for BottomSheetModalRepeat:*/
  // ref;
  const bottomSheetModalRepeatRef = useRef(null);
  // state
  const [isSheetClosedRepeat, setIsSheetClosedRepeat] = useState(true);
  // variables
  const snapPointsRepeat = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressRepeat = useCallback(() => {
    console.log("press" + route.params.task.gmail);
    if (route.params.task.gmail) return;
    setIsSheetClosedRepeat(false);
    bottomSheetModalRepeatRef.current?.present();
  }, []);

  const [selectedItemRepeat, setSelectedItemRepeat] = useState(null);

  const handleItemSelectRepeat = (item) => {
    if (route.params.task.gmail) return;
    setreminder(null);
    setdue(null);
    setRepeat(item);
  };
  /*code using for BottomSheetModalRepeat:*/

  /**code using for BottomSheetModalAttach:*/
  // ref;
  const bottomSheetModalAttachRef = useRef(null);
  // state
  const [isSheetClosedAttach, setIsSheetClosedAttach] = useState(true);
  // variables
  const snapPointsAttach = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressAttach = useCallback(() => {
    if (route.params.task.gmail) return;
    setIsSheetClosedAttach(false);
    bottomSheetModalAttachRef.current?.present();
  }, []);
  /*code using for BottomSheetModalRepeat:*/

  const handlePresentModalPressLocation = () => {
    // if (route.params.task.gmail) return;
    navigation.navigate("AddLocation", {
      task: task,
    });
  };

  const handCheckTask = () => {
    status ? setStatus(false) : setStatus(true);
  };

  const reminderReset = useRef(null);
  const handleDeleteReminder = () => {
    if (route.params.task.gmail) return;
    setreminder(null);
    reminderReset.current.text = "Reminder:";
  };

  const locationReset = useRef(null);
  const handleDeleteLocation = () => {
    if (route.params.task.gmail) return;
    setLocation(null);
    locationReset.current.text = "Not set location:";
  };

  const duetoReset = useRef(null);
  const handleDeleteDueto = () => {
    if (route.params.task.gmail) return;
    setdue(null);
    duetoReset.current.text = "Due to:";
  };
  const repeatReset = useRef(null);
  const handleDeleteRepeat = () => {
    if (route.params.task.gmail) return;
    setRepeat(null);
    repeatReset.current.text = "Repeat:";
  };
  const attachReset = useRef();
  const handleDeleteAttach = () => {
    if (route.params.task.gmail) return;
    setAttachments([]);
  };

  const alertNotiDelete = () => {
    Alert.alert("Warning!!!", "Are you sure delete Task? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => handleDeleteTask(),
      },
    ]);
  };

  const handleDeleteTask = async () => {
    if (route.params.task.gmail) return;
    await DeleteTaskFrontEnd(task);
    navigation.navigate("HomeDrawer", { task: null });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={200}
    >
      <View style={styles.viewTitleScreen}>
        <Text style={styles.titleScreenText}> Detail Task</Text>
        <MaterialCommunityIcons
          name={route.params.task.gmail ? "google" : "subtitles"}
          size={40}
          color={route.params.task.gmail ? "green" : "purple"}
        />
      </View>

      <View style={styles.viewBody}>
        <View style={styles.titleTask}>
          <Input
            disabled={route.params.task.gmail}
            inputStyle={{ fontSize: 20 }}
            color="blue"
            placeholder="Title task"
            value={title}
            onChangeText={(text) => setTitle(text)}
            leftIcon={
              <MaterialCommunityIcons
                name="format-title"
                size={30}
                color="purple"
              />
            }
          />
        </View>

        <View style={styles.status}>
          <TouchableOpacity
            style={styles.touchstatus}
            // onPress={handlePresentModalPressReminder}
          >
            <MaterialIcons
              name="file-download-done"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }}>
              Status: {status ? "Done" : "In process"}
            </Text>
          </TouchableOpacity>
          <View>
            {status ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="purple"
                marginHorizontal={10}
                onPress={handCheckTask}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={20}
                color="purple"
                marginHorizontal={10}
                onPress={handCheckTask}
              />
            )}
          </View>
        </View>

        <View style={styles.reminder}>
          <TouchableOpacity
            style={styles.touchreminder}
            onPress={handlePresentModalPressReminder}
          >
            <MaterialIcons
              name="circle-notifications"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }} ref={reminderReset}>
              Reminder: {reminder ? convertDate(reminder) : "Not set"}
            </Text>
          </TouchableOpacity>
          <Feather
            name="delete"
            size={20}
            color="purple"
            marginHorizontal={10}
            onPress={handleDeleteReminder}
          />
        </View>

        <View style={styles.location}>
          <TouchableOpacity
            style={styles.touchlocation}
            onPress={handlePresentModalPressLocation}
          >
            <MaterialIcons
              name="add-location"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }} ref={locationReset}>
              Location: {location ? location.name : "Not set"}
            </Text>
          </TouchableOpacity>
          <Feather
            name="delete"
            size={20}
            color="purple"
            marginHorizontal={10}
            onPress={handleDeleteLocation}
          />
        </View>
        <View style={styles.dueto}>
          <TouchableOpacity
            style={styles.touchdueto}
            onPress={handlePresentModalPressDueTo}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }} ref={duetoReset}>
              Due: {due ? convertDate(due) : "Not set"}
            </Text>
          </TouchableOpacity>
          <Feather
            name="delete"
            size={20}
            color="purple"
            marginHorizontal={10}
            onPress={handleDeleteDueto}
          />
        </View>

        <View style={styles.repeat}>
          <TouchableOpacity
            style={styles.touchrepeat}
            onPress={handlePresentModalPressRepeat}
          >
            <MaterialCommunityIcons
              name="repeat"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }} ref={repeatReset}>
              Repeat: {convertRepeat(repeat)}
            </Text>
          </TouchableOpacity>
          <Feather
            name="delete"
            size={20}
            color="purple"
            marginHorizontal={10}
            onPress={handleDeleteRepeat}
          />
        </View>

        <View style={styles.attackfile}>
          <TouchableOpacity
            style={styles.touchattach}
            onPress={handlePresentModalPressAttach}
          >
            <MaterialCommunityIcons
              name="attachment"
              size={28}
              color="purple"
              marginHorizontal={5}
              marginVertical={5}
            />
            <Text style={{ fontSize: 18 }}>Attach Files</Text>
          </TouchableOpacity>
          <Feather
            name="delete"
            size={20}
            color="purple"
            marginHorizontal={10}
            onPress={handleDeleteAttach}
          />
        </View>
        <View>
          <FlatList
            ref={attachReset}
            data={
              attachments
                ? attachments.map((item, index) => {
                    return {
                      key: index,
                      name: item.name,
                      type: item.mimeType,
                      uri: item.uri,
                    };
                  })
                : []
            }
            keyExtractor={(item) => item.key.toString()}
            renderItem={({ item }) => (
              <View style={styles.viewAttach}>
                <Feather
                  style={{ flex: 1, marginVertical: 5 }}
                  name={
                    item.type == "jpg"
                      ? "image"
                      : item.type == "txt"
                      ? "file-text"
                      : item.type == "m4r"
                      ? "audio"
                      : "grid"
                  }
                  size={22}
                  color="purple"
                  marginHorizontal={10}
                  // onPress={}
                />
                <Text style={{ flex: 3 }}>
                  Name: {item.type == "jpg" ? "image-name " : item.name}
                </Text>
                <Text style={{ flex: 3 }}>- Type: {item.type}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.noteView}>
          {/* <Input
            multiline={true}
            leftIcon={
              <MaterialCommunityIcons
                name="note-plus-outline"
                size={25}
                color="purple"
                marginHorizontal={2}
                marginVertical={2}
              />
            }
            value={note}
            onChangeText={(e) => setNote(e)}
          /> */}
          <MaterialCommunityIcons
            name="note-plus-outline"
            size={28}
            color="purple"
            marginHorizontal={2}
            marginVertical={2}
          />
          <TextInput
            editable={!route.params.task.gmail}
            fontSize={18}
            placeholder="User noted is here...."
            value={note}
            onChangeText={(e) => setNote(e)}
            multiline={true}
            onFocus={() => {
              setNoteFocus(true);
            }}
          />
          {/* <View style={styles.button}>
            {noteFocus ? (
              <Button
                onPress={() => {
                  setNoteFocus(false);
                  Keyboard.dismiss();
                }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                  backgroundColor: "rgb(179, 55, 225)",
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 120,
                  marginHorizontal: 5,
                  marginVertical: 10,
                }}
                title="Back"
              />
            ) : (
              ""
            )}
          </View> */}
        </View>
        {!route.params.task.gmail && (
          <View style={styles.button}>
            <Button
              iconContainerStyle={{ marginRight: 10 }}
              onPress={handleSaveTask}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "rgb(179, 55, 225)",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 120,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              title="Save"
              icon={{
                name: "save",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
            />

            <Button
              iconContainerStyle={{ marginRight: 10 }}
              onPress={alertNotiDelete}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "rgb(179, 55, 225)",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 120,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
              title="Delete"
              icon={{
                name: "delete",
                type: "MaterialCommunityIcons",
                size: 15,
                color: "white",
              }}
            />
          </View>
        )}
      </View>

      <BottomSheetModalProvider>
        <View style={styles.containerBottomSheetReminder}>
          <BottomSheetModal
            ref={bottomSheetModalReminderRef}
            index={1}
            snapPoints={snapPointsReminder}
            handleHeight={0}
            enableDismissOnClose={true}
            // onChange={handleSheetChangesReminder}
            // onClose={handleSheetClose}
          >
            <BSMReminder
              onItemSelectReminder={handleItemSelectReminder}
              reminder={reminder}
            />
          </BottomSheetModal>
        </View>
        <View style={styles.containerBottomSheetDueTo}>
          <BottomSheetModal
            ref={bottomSheetModalDueToRef}
            index={1}
            snapPoints={snapPointsDueTo}
            handleHeight={0}
            enableDismissOnClose={true}
            // onChange={handleSheetChangesDueTo}
            // onClose={handleSheetClose}
          >
            <BSMDueTo onItemSelectDueTo={handleItemSelectDueTo} due={due} />
          </BottomSheetModal>
        </View>
        <View style={styles.containerBottomSheetRepeat}>
          <BottomSheetModal
            ref={bottomSheetModalRepeatRef}
            index={1}
            snapPoints={snapPointsRepeat}
            handleHeight={0}
            enableDismissOnClose={true}
            // onChange={handleSheetChangesRepeat}
            // onClose={handleSheetClose}
          >
            <BSMRepeat
              onItemSelectRepeat={handleItemSelectRepeat}
              repeat={repeat}
            />
          </BottomSheetModal>
        </View>

        <View style={styles.containerBottomSheetAttach}>
          <BottomSheetModal
            ref={bottomSheetModalAttachRef}
            index={1}
            snapPoints={snapPointsAttach}
            handleHeight={0}
            enableDismissOnClose={true}
            // onChange={handleSheetChangesRepeat}
            // onClose={handleSheetClose}
          >
            <BSMAttach navigation={navigation} task={task} />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </KeyboardAvoidingView>
  );
};
export default DetailTask;

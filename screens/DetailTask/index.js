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

    console.log("detail focus" + isFocused);
  }, [isFocused]);

  const [task, setTask] = useState(route.params.task);
  const [note, setNote] = useState(route.params.note);
  const [title, setTitle] = useState(route.params.task.title);
  const [due, setdue] = useState(route.params.task.due);
  const [reminder, setreminder] = useState(route.params.task.reminder);
  const [location, setLocation] = useState(route.params.task.location);
  const [repeat, setRepeat] = useState(route.params.task.repeat);
  const [attachments, setAttachments] = useState(route.params.task.attachments);
  const [viewListAttach, setViewAttach] = useState([]);

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
  const bottomSheetModalReminderRef = useRef(null);
  // state
  const [isSheetClosedReminder, setIsSheetClosedReminder] = useState(true);
  // variables
  const snapPointsReminder = useMemo(() => ["30%", "30%"], []);

  // callbacks
  const handlePresentModalPressReminder = useCallback(() => {
    setIsSheetClosedReminder(false);
    bottomSheetModalReminderRef.current?.present();
  }, []);

  const handleSaveTask = async () => {
    let update = task;
    update.title = title;
    update.due = due;
    update.note = note;
    update.location = location;
    update.repeat = repeat;
    update.reminder = reminder;
    await UpdateTaskFrontEnd(update);
    console.log("saved");
    navigation.navigate("HomeDrawer", {
      task: null,
    });
  };

  const handleSheetClose = () => {
    console.log("da bam");
    bottomSheetModalReminderRef.current?.dismiss(); // Đóng BottomSheet khi người dùng bấm bên ngoài
  };
  const handleSheetChangesReminder = useCallback((index) => {
    if (index === -1) {
      bottomSheetModalReminderRef.current?.dismiss();
      console.log("da dong");
    } else {
      console.log("da mo");
      bottomSheetModalReminderRef.current?.present();
    }
  }, []);
  const [selectedItemReminder, setSelectedItemReminder] = useState(null);

  const handleItemSelectReminder = (item) => {
    if (!due) {
      alert("cannot set reminder if due is not set");
      return;
    }
    let check = new Date(due);
    if (check.getTime() - item.getTime() <= 360000) {
      console.log(check.getTime());
      console.log(item.getTime());
      console.log(check.getTime() - item.getTime());
      alert("cannot set reminder prior less than 1 hour");
      return;
    }
    if (check.getTime() - Date.now() <= 0) {
      alert("cannot set reminder when due is passed");
      return;
    }

    if (item.getTime() - Date.now() <= 0) {
      alert("cannot set reminder when prior than moment");
      return;
    }
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
    setIsSheetClosedDueto(false);
    bottomSheetModalDueToRef.current?.present();
  }, []);

  const [selectedItemDueTo, setSelectedItemDueTo] = useState(null);

  const handleItemSelectDueTo = (item) => {
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
    setIsSheetClosedRepeat(false);
    bottomSheetModalRepeatRef.current?.present();
  }, []);

  const [selectedItemRepeat, setSelectedItemRepeat] = useState(null);

  const handleItemSelectRepeat = (item) => {
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
    setIsSheetClosedAttach(false);
    bottomSheetModalAttachRef.current?.present();
  }, []);

  const [selectedItemAttach, setSelectedItemAttach] = useState(null);

  const handleItemSelectAttach = (item) => {
    setSelectedItemAttach(item);
    console.log("component cha:", item);
    setSelectedItemAttach(item);
  };
  /*code using for BottomSheetModalRepeat:*/

  const handlePresentModalPressLocation = () => {
    navigation.navigate("AddLocation", {
      task: task,
    });
  };

  const reminderReset = useRef(null);
  const handleDeleteReminder = () => {
    setreminder(null);
    reminderReset.current.text = "Reminder:";
  };

  const locationReset = useRef(null);
  const handleDeleteLocation = () => {
    setLocation(null);
    locationReset.current.text = "Not set location:";
  };

  const duetoReset = useRef(null);
  const handleDeleteDueto = () => {
    setdue(null);
    duetoReset.current.text = "Due to:";
  };
  const repeatReset = useRef(null);
  const handleDeleteRepeat = () => {
    setRepeat(null);
    repeatReset.current.text = "Repeat:";
  };
  const attachReset = useRef();
  const handleDeleteAttach = () => {
    let _task = task;
    _task.attachments = [];
    setTask(_task);
    setView();
  };

  const setView = () => {
    let view = [];
    view = task.attachments.map((item, index) => {
      return {
        key: index,
        name: item.name,
        type: item.mimeType,
        uri: item.uri,
      };
    });
    setViewAttach(view);
  };
  setView();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={200}
    >
      <View style={styles.viewTitleScreen}>
        <Text style={styles.titleScreenText}> Detail Task</Text>
        <MaterialCommunityIcons name="subtitles" size={40} color="purple" />
      </View>

      <View style={styles.viewBody}>
        <View style={styles.titleTask}>
          <Input
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
            data={viewListAttach}
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
            fontSize={18}
            placeholder="User noted is here...."
            value={note}
            onChangeText={(e) => setNote(e)}
            multiline={true}
          />
        </View>

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
            title="Delete"
            icon={{
              name: "delete",
              type: "MaterialCommunityIcons",
              size: 15,
              color: "white",
            }}
          />
        </View>
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

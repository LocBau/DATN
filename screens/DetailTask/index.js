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
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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

  useEffect(()=>{
    setTask(route.params.task);
    setLocation(route.params.task.location);
    console.log("detail focus"+isFocused);
  },[isFocused])

  const [task, setTask] = useState(route.params.task);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState(route.params.task.title);
  const [due, setdue] = useState(route.params.task.due);
  const [location, setLocation] = useState(route.params.task.location);

  console.log(task);
  const convertDate = (date) => {
    console.log(date);
    if (!date) return "Not set";
    if(typeof(date)=='string') {
      let d = date.split('T');
      let t = new Date(date);
      return d[0] + " / " +t.toTimeString().split(" ")[0];
    }
    
    // if (typeo)

  }
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
    await UpdateTaskFrontEnd(update);
  }

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
    selectedItemReminder(item);
    console.log("component cha:", item);
    setSelectedItemReminder(item);
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
    setSelectedItemRepeat(item);
    console.log("component cha:", item);
    setSelectedItemRepeat(item);
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
  
  const handlePresentModalPressLocation= () => {
    navigation.navigate("AddLocation" , {
      task:task
    })
  }

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
            value={title}
            onChangeText={(text)=>setTitle(text)}
            leftIcon={
              <MaterialCommunityIcons
                name="format-title"
                size={24}
                color="purple"
              />
            }
          />
        </View>

        <TouchableOpacity
          style={styles.reminder}
          onPress={handlePresentModalPressReminder}
        >
          <MaterialIcons
            name="circle-notifications"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Reminder me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reminder}
          onPress={handlePresentModalPressLocation}
        >
          <MaterialIcons
            name="circle-notifications"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>{location ? location.name : "Not set" }</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dueto}
          onPress={handlePresentModalPressDueTo}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text
          >Due:  {
            due? convertDate(due) : "Not set"
            }
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.repeat}
          onPress={handlePresentModalPressRepeat}
        >
          <MaterialCommunityIcons
            name="repeat"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Repeat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.attackfile}
          onPress={handlePresentModalPressAttach}
        >
          <MaterialCommunityIcons
            name="attachment"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <Text>Attach File</Text>
        </TouchableOpacity>
        <View style={styles.note}>
          <MaterialCommunityIcons
            name="note-plus-outline"
            size={25}
            color="purple"
            marginHorizontal={5}
            marginVertical={5}
          />
          <TextInput multiline
          value={note}
          onChangeText={(e)=>setNote(e)}
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
            <BSMReminder onItemSelectReminder={handleItemSelectReminder} />
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
            <BSMRepeat onItemSelectRepeat={handleItemSelectRepeat} />
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
    </View>
  );
};
export default DetailTask;

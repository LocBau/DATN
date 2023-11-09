import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
  Tooltip,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
const AgendaItem = (props) => {
  const { item, info } = props;
  // console.log(item);

  const testIDs = {
    menu: {
      CONTAINER: "menu",
      CALENDARS: "calendars_btn",
      CALENDAR_LIST: "calendar_list_btn",
      HORIZONTAL_LIST: "horizontal_list_btn",
      AGENDA: "agenda_btn",
      EXPANDABLE_CALENDAR: "expandable_calendar_btn",
      WEEK_CALENDAR: "week_calendar_btn",
      TIMELINE_CALENDAR: "timeline_calendar_btn",
      PLAYGROUND: "playground_btn",
    },
    calendars: {
      CONTAINER: "calendars",
      FIRST: "first_calendar",
      LAST: "last_calendar",
    },
    calendarList: { CONTAINER: "calendarList" },
    horizontalList: { CONTAINER: "horizontalList" },
    agenda: {
      CONTAINER: "agenda",
      ITEM: "item",
    },
    expandableCalendar: { CONTAINER: "expandableCalendar" },
    weekCalendar: { CONTAINER: "weekCalendar" },
  };
  const buttonPressed = useCallback(() => {
    info(item);
  }, []);

  // const itemPressed = useCallback(() => {
  //   info(item);
  // }, []);

  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  const viewSource = () => {
    // console.log(props.item.title);
    // cho nay em tạo them 1 props 'item.source' nào để biết từ GGCalendar bỏ dzo đây nhé!
    // code nay a để ví dụ cho item.title thôi..!!
    if (props.item.title == "GGcalendar") {
      return (
        <View style={styles.viewGcalendar}>
          <Ionicons
            name="logo-google"
            size={20}
            color="green"
            onPress={buttonPressed}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewInfo}>
          <FontAwesome
            name="info-circle"
            size={20}
            color="purple"
            onPress={buttonPressed}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={itemPressed} testID={testIDs.agenda.ITEM}> */}
      <View style={styles.viewTime}>
        <Text style={styles.itemHourText}>{item.hour}</Text>
      </View>
      <View style={styles.viewTitle}>
        <Text style={styles.itemTitleText}>{item.title}</Text>
      </View>

      <View style={styles.viewSource}>{viewSource()}</View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  viewTime: {
    flex: 1,
  },
  itemHourText: {
    color: "black",
  },
  viewTitle: {
    flex: 6,
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  viewSource: {
    flex: 1,
    alignItems: "center",
  },
  viewGcalendar: {
    flex: 1,
  },
  viewInfo: {
    flex: 1,
    alignItems: "center",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});

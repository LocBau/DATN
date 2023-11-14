import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";
const AgendaItem = (props) => {
  const { item, info } = props;

  console.log("vo calendar...");
  console.log(item.data.gmail);

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
  const buttonPressed = () => {
    console.log(item.title);
    info(item);
  };

  // const itemPressed = () => {
  //   console.log(item.title);
  //   info(item);
  // }

  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  const viewSource = () => {
    // console.log(props.item.title);
    if (item.data.gmail) {
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
  const [showTip, setTip] = useState(false);
  const viewcontentToolTip = () => {
    if (item.data.gmail) {
      return <Text>{props.item.data.gmail}</Text>;
    } else {
      return <Text>on app</Text>;
    }
  };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={itemPressed} testID={testIDs.agenda.ITEM}> */}
      <View style={styles.viewTime}>
        <Text style={styles.itemHourText}>{item.hour}</Text>
      </View>
      <View style={styles.viewTitle}>
        {props.item.data.done ? (
          <Tooltip
            isVisible={showTip}
            // animated
            content={
              <View style={{ width: "auto", backgroundColor: "light" }}>
                {viewcontentToolTip()}
              </View>
            }
            placement="top"
            onClose={() => setTip(false)}
          >
            <TouchableOpacity
              onPress={() => {
                setTip(true);
              }}
            >
              <Text style={styles.itemTitleTextDone}>{item.title}</Text>
            </TouchableOpacity>
          </Tooltip>
        ) : (
          <Tooltip
            isVisible={showTip}
            animated
            content={
              <View style={{ width: "auto" }}>{viewcontentToolTip()}</View>
            }
            placement="top"
            onClose={() => setTip(false)}
          >
            <TouchableOpacity
              onPress={() => {
                setTip(true);
              }}
            >
              <Text style={styles.itemTitleText}>{item.title}</Text>
            </TouchableOpacity>
          </Tooltip>
        )}
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
  itemTitleTextDone: {
    color: "green",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "line-through",
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

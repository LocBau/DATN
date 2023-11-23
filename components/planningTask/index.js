import React, { useRef, useCallback, useState, useEffect } from "react";
import { StyleSheet, View, Text, Scrollview, ScrollView } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import { Button, Card } from "react-native-paper";
import AgendaItem from "../../components/agendaItem/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { isSunday } from "date-fns";
import { FlatList } from "react-native-gesture-handler";
import ItemTaskMonitor from "../itemTaskMonitor";

const PlanningTask = () => {
  const WEEKDAY = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const ADDDATEVALUE = 86400000;
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

  const theme = {
    // arrows
    arrowColor: "black",
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: "#00AAAF",
    // month
    monthTextColor: "black",
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold",
    // day names
    textSectionTitleColor: "black",
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal",
    // dates
    dayTextColor: "#00AAAF",
    todayTextColor: "#af0078",
    textDayFontSize: 18,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500",
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: "#00AAAF",
    selectedDayTextColor: "white",
    // disabled date
    textDisabledColor: "#f2f7f7",
    // dot (marked date)
    dotColor: "#00AAAF",
    selectedDotColor: "white",
    disabledDotColor: "#f2f7f7",
    dotStyle: { marginTop: -2 },
  };

  const today = new Date().toISOString().split("T")[0];
  const [selectDate, setSelectDate] = useState();
  const onDateChanged = useCallback(async (date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);
    setSelectDate(date);
    // setView([]);
    console.log(selectDate);
    await AsyncStorage.setItem("selectdate", date);
  }, []);
  // function renderItem({ item }) {
  //   return <AgendaItem item={item} info={info} />;
  // }

  const data = {
    dayweek: isSunday,
    title: "demo planning task",
    createtime: {
      weekday: "Mon",
      day: 20,
      month: 11,
      year: 2023,
    },
    dueTime: {
      weekday: "Thu",
      day: 24,
      month: 11,
      year: 2023,
    },

    late: false,
    done: false,
  };
  const viewForHead = {
    pos: 1,
    part: "head",
    color: "rgb(222, 156, 156)",
  };
  const viewForBody = {
    pos: 1,
    part: "body",
    color: "rgb(222, 156, 156)",
    lenght: 4, // day
  };
  const viewForFoot = {
    pos: 4,
    part: "foot",
    color: "rgb(222, 156, 156)",
    lenght: "",
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerCalendar}>
        {/* <Text>abcd</Text> */}
        <CalendarProvider
          // style={(innerHeight = "100%")}
          date={today}
          // onDateChanged={(date)=> {
          //   setSelectDate(date)

          // }}
          onDateChanged={onDateChanged}
          // onMonthChange={onMonthChange}
          showTodayButton
          disabledOpacity={0.6}
          // theme={todayBtnTheme.current}
          // todayBottomMargin={16}
        >
          <View style={styles.calendarWeek}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.framecalendarWeek}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "blue",
                    marginVertical: 5,
                  }}
                >
                  {selectDate
                    ? new Date(selectDate).toString().split(" ")[1] +
                      " " +
                      new Date(selectDate).toString().split(" ")[3]
                    : "----"}
                </Text>
              </View>
            </View>

            <WeekCalendar
              testID={testIDs.weekCalendar.CONTAINER}
              theme={theme.arrowColor}
            />
          </View>
        </CalendarProvider>
      </View>

      <View style={styles.containertask}>
        <ScrollView>
          <ItemTaskMonitor
            viewForHead={viewForHead}
            viewForBody={viewForBody}
            viewForFoot={viewForFoot}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PlanningTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray", //"#e4fba5",
  },
  containerCalendar: {
    // flex: 1,
    height: 141,
    backgroundColor: "green",
  },
  calendarWeek: {
    height: 141,
    // marginTop: 50,
    backgroundColor: "#e6c3e8",
  },
  framecalendarWeek: {
    alignItems: "center",
    marginVertical: 10,
    width: "25%",
    height: 40,
    backgroundColor: "#efefef",
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 25,
      },
    }),
  },
  containertask: {
    // flex: 2,
    height: 565,
    width: "100%",
    backgroundColor: "#e4fba5",
    // marginBottom: 114,
    alignItems: "center",
  },
});

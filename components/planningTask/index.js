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
  const [selectDate, setSelectDate] = useState(today);
  const [task, setTask] = useState([]);
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

  useEffect(() => {
    console.log("asd");
    async function getData() {
      let _data = await AsyncStorage.getItem("tasks");
      if (_data) {
        _data = JSON.parse(_data);
      }
      if (_data) {
        _data = _data.task;
      }

      console.log(_data);
      if (_data) {

        let d = new Date(selectDate);
        let td = new Date();
        d.setTime(d.getTime()-d.getDay()* 86400000  );
        let e = new Date(d.getTime()+7* 86400000);
        let _view = [];
        for (const i of _data) {
          let temp = i;
          let create = new Date(i.create_at);
          if(create.getTime() >= d.getTime() && create.getTime() < e.getTime()) {
            temp.start = create.getDay() +1;

          }
          let due = new Date(i.due);
          if(due.getTime() >= d.getTime() && due.getTime() < e.getTime()) {
            temp.end = due.getDay() +1;
          }
          if(due && due.getTime() < td.getTime() && !temp.done) {
            temp.late = true;
          }
          let reminder = new Date(i.reminder);
          if(reminder.getTime() >= d.getTime() && reminder.getTime() < e.getTime()) {
            temp.end = reminder.getDay() +1;
          }
          if(!temp.end && !temp.start) {
            if(i.due && due.getTime() < d.getTime()  ) {
              temp.outside = true;
            }
            if(i.reminder && reminder.getTime() < d.getTime()  ) {
              temp.outside = true;
            }

            if(i.create_at &&  create.getTime() > e.getTime()) {
              temp.outside = true;
            }
          }

          if(i.due ||  i.reminder) {
            
            _view.push(temp);
          }
        }
        setTask(_view);
        console.log(_view);
      }
    }
    getData();
  }, [selectDate]);


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
          {
            task.map((item) => {
              if(!item.outside) return (<ItemTaskMonitor
              data={item}
              />)
            })
          }
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

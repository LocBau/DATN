import React, { useRef, useCallback, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
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


const Calendar = ({navigation, route}) => {
    const WEEKDAY = ["SU" , "MO" , "TU" , "WE" , "TH" , "FR" , "SA"];
    const ADDDATEVALUE = 86400000;
    const testIDs = {
      menu: {
        CONTAINER: 'menu',
        CALENDARS: 'calendars_btn',
        CALENDAR_LIST: 'calendar_list_btn',
        HORIZONTAL_LIST: 'horizontal_list_btn',
        AGENDA: 'agenda_btn',
        EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
        WEEK_CALENDAR: 'week_calendar_btn',
        TIMELINE_CALENDAR: 'timeline_calendar_btn',
        PLAYGROUND: 'playground_btn'
      },
      calendars: {
        CONTAINER: 'calendars',
        FIRST: 'first_calendar',
        LAST: 'last_calendar'
      },
      calendarList: {CONTAINER: 'calendarList'},
      horizontalList: {CONTAINER: 'horizontalList'},
      agenda: {
        CONTAINER: 'agenda',
        ITEM: 'item'
      },
      expandableCalendar: {CONTAINER: 'expandableCalendar'},
      weekCalendar: {CONTAINER: 'weekCalendar'}
    };

    const theme = {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // knob
      expandableKnobColor: '#00AAAF',
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: '#00AAAF',
      todayTextColor: '#af0078',
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500' ,
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: '#00AAAF',
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: '#f2f7f7',
      // dot (marked date)
      dotColor: '#00AAAF',
      selectedDotColor: 'white',
      disabledDotColor: '#f2f7f7',
      dotStyle: {marginTop: -2}
    }
    const today = new Date().toISOString().split('T')[0];
    const [view, setView] = useState([]);
    const[load, setLoad] = useState(false);
    const [selectDate, setSelectDate] = useState();
    const [mark,setMark] = useState({});
    const [weekview,setweekview] = useState(false);


    const info = (item) => {

      navigation.navigate('DetailTask' ,{
        task:item.data
      })
    }
    console.log("change");
    useEffect(()=> {
      console.log("items");
      async function x() {
        let d = await AsyncStorage.getItem('selectdate');
        let tasks = await AsyncStorage.getItem('tasks');
        let google_events = await AsyncStorage.getItem('google_events');
        if(google_events) {
          google_events = JSON.parse(google_events);
        }
        
        tasks = JSON.parse(tasks);
        
        tasks= tasks.task;
        if(google_events && tasks) {
          tasks = tasks.concat(google_events);
        }
        console.log(google_events);
        let _mark = {};
        let data = {repeat:[]};
        let _view = [{title:d, data:[]}];
        for (const i of tasks) {
          if(!i.create_at && !i.due && !i.repeat) continue;
          let timestamp = "";
          if(i.create_at) timestamp = i.create_at
          if (i.due && !i.repeat)timestamp =  i.due


        if (i.reminder && !i.repeat) timestamp = i.reminder;
        let _date = timestamp.split("T");
        let temp = new Date(timestamp);

        let _hour = temp.toTimeString().split(":");
        if (i.repeat) {
          let t = new Date(i.repeat.hour);
          let _timestamp = new Date(timestamp);

          _timestamp.setHours(t.getHours());
          _timestamp.setMinutes(t.getMinutes());
          timestamp = _timestamp.toISOString();
          _hour = _timestamp.toTimeString().split(":");
          console.log(_hour);
          data["repeat"].push({
            hour: _hour[0] + ":" + _hour[1],
            title: i.repeat.type + "-" + i.title,
            data: i,
            timestamp: timestamp,
            repeat: i.repeat,
          });
          continue;
        }
        if (!data[_date[0]]) {
          data[_date[0]] = [
            {
              hour: _hour[0] + ":" + _hour[1],
              title: i.title,
              data: i,
              timestamp: timestamp,
            },
          ];
        } else {
          data[_date[0]].push({
            hour: _hour[0] + ":" + _hour[1],
            title: i.title,
            data: i,
            timestamp: timestamp,
          });
        }
      }
      let _data = [];
      function compareDate(a, b) {
        let a_date = new Date(a.timestamp).getTime();
        let b_date = new Date(b.timestamp).getTime();
        return a_date - b_date;
      }
      _view[0].data = data[d] || [];
      console.log(_view);
      console.log(data[d]);
      for (const k in data) {
        if (Object.hasOwnProperty.call(data, k)) {
          const element = data[k];
          _mark[k] = { marked: true };
        }
      }

        for (const i of data["repeat"]) {
          console.log("test");
          if (i.repeat.type.includes("Daily")) {
            
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            _timestamp.setMinutes(t.getMinutes());
            _timestamp.setSeconds(t.getSeconds());
            _timestamp.setMilliseconds(t.getMilliseconds());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            if(!i.gmail || !i.repeat.info || !i.repeat.info.INTERVAL) {
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              _view[0].data.push(temp);
              continue;
            } else {
              let interval = parseInt(i.repeat.info.INTERVAL);
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              if (count % interval !=0) continue;
              _view[0].data.push(temp);
            }
          }
          if (i.repeat.type.includes("Weekly")) {
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            _timestamp.setMinutes(t.getMinutes());
            _timestamp.setSeconds(t.getSeconds());
            _timestamp.setMilliseconds(t.getMilliseconds());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            if(_timestamp.getDay() ==1 && !i.gmail) {
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              _view[0].data.push(temp);
              continue;
            }
            if(i.gmail && i.repeat.info && i.repeat.info.BYDAY) {
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              let byday = i.repeat.info.BYDAY.split(",");
              for (const i of byday) {
                if(_timestamp.getDay() == WEEKDAY.indexOf(i)){
                  _view[0].data.push(temp);
                  break;
                };
              }

            } 
          }
          
          if (i.repeat.type.includes("Monthly")) {
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            _timestamp.setMinutes(t.getMinutes());
            _timestamp.setSeconds(t.getSeconds());
            _timestamp.setMilliseconds(t.getMilliseconds());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            if(_timestamp.getDate() ==15 && !i.gmail && (!i.repeat.info)) {
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              _view[0].data.push(temp);
            } else if (i.gmail || i.repeat.info){
              let interval = parseInt(i.repeat.info.INTERVAL) || 1;
              let count = Math.round((_timestamp.getTime() - t.getTime())/ADDDATEVALUE);
              if (count < 0 ) continue;
              if (_timestamp.getDate() !== 6) continue;
              let check = _timestamp.getMonth() + (_timestamp.getFullYear()-t.getFullYear())*12 - t.getMonth();
              if (check % interval !=0) continue;
              _view[0].data.push(temp);
            }
            
          }
        };
        _view[0].data.sort(compareDate);
        console.log(_view[0].data);
        setLoad(true);
        setMark(_mark);
        setSelectDate(d);
        setView(_view);
      }
      
    x();
    if (load) return;
    console.log("effect");

    // getTask();
  }, [selectDate]);

  const onDateChanged = useCallback(async (date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);
    setSelectDate(date);
    // setView([]);
    console.log(selectDate);
    await AsyncStorage.setItem("selectdate", date);
  }, []);
  function renderItem({ item }) {
    return <AgendaItem item={item} info={info} />;
  }

  return (
    <CalendarProvider
      style={(innerHeight = "90%")}
      date={today}
      // onDateChanged={(date)=> {
      //   setSelectDate(date)

      // }}
      onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      // theme={todayBtnTheme.current}
      // todayBottomMargin={16}
    >
      <View style={styles.header}>
        <Text style={styles.titleScreen}>Calendar</Text>
        <FontAwesome name="calendar" size={40} color="purple" />
      </View>

      {weekview ? (
        <View style={styles.calendarWeek}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.framecalendarWeek}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "18px",
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

          <WeekCalendar testID={testIDs.expandableCalendar.CONTAINER} />
        </View>
      ) : (
        <View style={styles.calendarMonth}>
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            disablePan
            // hideKnob
            initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            disableWeekScroll
            theme={theme.current}
            // disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={mark}
            // leftArrowImageSource={leftArrowIcon}
            // rightArrowImageSource={rightArrowIcon}
            // animateScroll
            // closeOnDayPress={false}
          />
        </View>
      )}

      <Button
        onPress={() => {
          setweekview(!weekview);
        }}
      >
        Change to {weekview ? "Month View" : "Week View"}
      </Button>
      <AgendaList
        sections={view}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendarMonth: {
    marginVertical: 5,
  },
  calendarWeek: {},
  header: {
    marginTop: 50,
    alignContent: "center",
    alignItems: "center",
  },
  titleScreen: {
    fontWeight: "bold",
    fontSize: 30,
  },
  section: {
    backgroundColor: "#f2f7f7",
    color: "grey",
    textTransform: "capitalize",
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
});
export default Calendar;

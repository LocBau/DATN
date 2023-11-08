import React, {useRef, useCallback, useState, useEffect} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { Button, Card } from 'react-native-paper';
import AgendaItem from '../../components/agendaItem/index'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Calendar = ({navigation, route}) => {
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
        tasks = JSON.parse(tasks);
        
        tasks= tasks.task;
        // console.log(tasks);
        let _mark = {};
        let data = {repeat:[]};
        let _view = [{title:d, data:[]}];
        for (const i of tasks) {
          if(!i.create_at && !i.due && !i.repeat) continue;
          let timestamp = "";
          if(i.create_at) timestamp = i.create_at
          if (i.due && !i.repeat)timestamp =  i.due

          if(i.reminder && !i.repeat) timestamp = i.reminder
          let _date = timestamp.split('T');
          let temp = new Date(timestamp);
          
          let _hour = temp.toTimeString().split(':');
          if(i.repeat) {

            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(timestamp);

            _timestamp.setHours(t.getHours());
            _timestamp.setMinutes(t.getMinutes());
            timestamp = _timestamp.toISOString();
            _hour = _timestamp.toTimeString().split(':');
            console.log(_hour);
            data["repeat"].push({hour: _hour[0] + ":" + _hour[1], title: i.repeat.type + "-" + i.title, data: i, timestamp:timestamp, repeat: i.repeat})
            continue;
          }
          if (!data[_date[0]]) {

            data[_date[0]] = [{hour: _hour[0] + ":" + _hour[1], title: i.title, data: i, timestamp:timestamp}];
            
          } else {
            data[_date[0]].push({hour: _hour[0] + ":" + _hour[1], title: i.title,data: i, timestamp:timestamp});
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
            _mark[k] = {marked:true}
          }
        }
        

        for (const i of data["repeat"]) {
          console.log("test");
          if (i.repeat.type.includes("Daily")) {
            
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            _timestamp.setMinutes(t.getMinutes());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            _view[0].data.push(temp);
          }
          if (i.repeat.type.includes("Weekly")) {
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            if(_timestamp.getDay() ==1) _view[0].data.push(temp);
            
          }
          if (i.repeat.type.includes("Monthly")) {
            let t = new Date(i.repeat.hour);
            let _timestamp = new Date(d);
            _timestamp.setHours(t.getHours());
            let temp = i;
            temp.timestamp = _timestamp.toISOString();
            if(_timestamp.getDate() ==15) _view[0].data.push(temp);
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
      if(load) return;
      console.log("effect");

      // getTask();
    },[selectDate])



     const onDateChanged = useCallback( async (date, updateSource) => {
    console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
      setSelectDate(date);
      // setView([]);
      console.log(selectDate);
      await AsyncStorage.setItem('selectdate',date);
  }, []);
    function renderItem  ({item}) {
      return <AgendaItem item={item} info={info}/>;
    };

      return (
        <CalendarProvider
          style={innerHeight="90%"}
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
        {
          weekview  ? (<View>
            <Text style={{textAlign:'center', fontSize:'18px'}}>--</Text>
            <Text style={{textAlign:'center', fontSize:'18px'}}>{selectDate ? new Date(selectDate).toString().split(' ')[1]  + " " + new Date(selectDate).toString().split(' ')[3]: "----"}</Text>
          <WeekCalendar
            testID={testIDs.expandableCalendar.CONTAINER}/>
          </View>
          ) : (
            <View>
              <Text style={{textAlign:'center', fontSize:'18px'}}>--</Text>
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
          )
        }

          <Button
          onPress={()=>{setweekview(!weekview)}}
          >Change to {weekview ? "Month View" : "Week View"}</Button>
          <AgendaList
            sections={view}  
            renderItem={renderItem}
            // scrollToNextEvent
            sectionStyle={styles.section}
            // dayFormat={'yyyy-MM-d'}
          />
        </CalendarProvider>
      );
    }



const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: '#f2f7f7',
    color: 'grey',
    textTransform: 'capitalize'
  }
});
export default Calendar;
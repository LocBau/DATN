import React, {useRef, useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { Card } from 'react-native-paper';
import AgendaItem from '../../components/agendaItem/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}



const Calendar = () => {
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
    
    const [items, setItems] = useState([]);
    const[load, setLoad] = useState(false);

    useEffect(()=> {
      console.log(items);
      if(load) return;
      console.log("effect");
      
      async function getTask() {
        
        let tasks = await AsyncStorage.getItem('tasks');
        

        tasks = JSON.parse(tasks);
        
        tasks= tasks.task;
        console.log(tasks);
        let data = {};
        for (const i of tasks) {
          if(!i.due) continue;
          let _date = i.due.split('T');
          console.log(_date[0]);
          let _hour = _date[1].split(":");
          console.log(data);
          if (!data[_date[0]]) {

            data[_date[0]] = [{hour: _hour[0] + ":" + _hour[1], title: i.title, data: i}]
            
          } else {
            data[_date[0]].push({hour: _hour[0] + ":" + _hour[1], title: i.title,data: i})
          }
        }

        let _data = []
        function compareDate(a, b) {
          let a_date = new Date(a.data.due).getTime();
          let b_date = new Date(b.data.due).getTime();
          return a_date - b_date;
        }
        for (const k in data) {
          console.log(k);
          if (Object.hasOwnProperty.call(data, k)) {
            data[k].sort(compareDate)
            _data.push({title: k, data: data[k]});
            
          }
        }
        setLoad(true);
        setItems(_data);

      }
      getTask();
    })
    
    // const ITEMS = [
    //   {
    //     title: dates[0],
    //     data: [{hour: '12am', duration: '1h', title: 'First Yoga'}]
    //   },
    //   {
    //     title: dates[1],
    //     data: [
    //       {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
    //       {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
    //     ]
    //   }
    // ];

    // const renderItem = (item) => {
    //   return <AgendaItem item={item}/>
    // }
    const renderItem = useCallback(({item}) => {
      return <AgendaItem item={item}/>;
    }, []);

      return (
        <CalendarProvider
          date='2023-11-02'
          // onDateChanged={onDateChanged}
          // onMonthChange={onMonthChange}
          showTodayButton
          // disabledOpacity={0.6}
          // theme={todayBtnTheme.current}
          // todayBottomMargin={16}
        >
          {false ? (
            <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={2}/>
          ) : (
            <ExpandableCalendar
              testID={testIDs.expandableCalendar.CONTAINER}
              // horizontal={false}
              // hideArrows
              // disablePan
              // hideKnob
              // initialPosition={ExpandableCalendar.positions.OPEN}
              // calendarStyle={styles.calendar}
              // headerStyle={styles.header} // for horizontal only
              // disableWeekScroll
              theme={theme.current}
              // disableAllTouchEventsForDisabledDays
              firstDay={1}
              markedDates={2}
              // leftArrowImageSource={leftArrowIcon}
              // rightArrowImageSource={rightArrowIcon}
              // animateScroll
              // closeOnDayPress={false}
            />
          )}
          {/* <AgendaItem /> */}
          <AgendaList
            sections={items}  
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
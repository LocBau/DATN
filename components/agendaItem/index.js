import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';




const AgendaItem = (props) => {
  const {item, info} = props;
  // console.log(item);

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
  const buttonPressed = useCallback(() => {
    info(item);
  }, []);

  const itemPressed = useCallback(() => {
    info(item);
  }, []);

  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={testIDs.agenda.ITEM}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        {/* <Text style={styles.itemDurationText}>{item.duration}</Text> */}
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>
      </View>
    </TouchableOpacity>
  );
};

export default AgendaItem;


const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});
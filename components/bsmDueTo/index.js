import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const BSMDueTo = ({onItemSelectDueTo, due}) => {

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    onItemSelectDueTo(currentDate);
  };
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate()+1);
  nextDate.setHours(9);
  nextDate.setMinutes(0);
  nextDate.setSeconds(0);

  let nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate()+7);
  nextWeek.setHours(9);
  nextWeek.setMinutes(0);
  nextWeek.setSeconds(0);

  const handleNextDay = () => {
    let d = new Date();
    
    d.setDate(d.getDate()+1);
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    onItemSelectDueTo(d);
  }
  const handleNextWeek = () => {
    let d = new Date();
    
    d.setDate(d.getDate()+7);
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    onItemSelectDueTo(d);
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Due To</Text>
      </View>
      <TouchableOpacity style={[styles.row1, styles.row11]}
      onPress={handleNextDay}
      >
        <MaterialCommunityIcons
          name="calendar-today"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Next Day</Text>
        <Text style={[styles.row1, styles.row12]}>{nextDate.toLocaleDateString() + " - " + nextDate.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}
      onPress={handleNextWeek}
      >
        <MaterialCommunityIcons
          name="calendar-today"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Next Week</Text>
        <Text style={[styles.row1, styles.row12]}>{nextWeek.toLocaleDateString() + " - " + nextWeek.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="calendar-today"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Pick a Date</Text>
        <DateTimePicker
            testID="dateTimePicker"
            value={due? new Date(due) : new Date(Date.now())}
            mode="datetime"
            is24Hour={true}
            onChange={onChangeDate}
          />
      </TouchableOpacity>


    </View>
  );
};

export default BSMDueTo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "blue",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 17,
  },
  row11: {
    flex: 1,
  },
  row12: { flex: 5 },
  row13: { flex: 1 },
  row14: { flex: 2 },
});

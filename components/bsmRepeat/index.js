import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const BSMRepeat = ({onItemSelectRepeat, repeat}) => {
  handleDaily = (event, selectedDate) => {
    const currentDate = new Date(selectedDate).toISOString();
    onItemSelectRepeat({
      type:"Daily",
      hour: currentDate
    })
  }
  handleWeekly = (event, selectedDate) => {
    const currentDate = new Date(selectedDate).toISOString();
    onItemSelectRepeat({
      type:"Weekly",
      hour: currentDate
    })
  }
  handlMonthly = (event, selectedDate) => {
    const currentDate = new Date(selectedDate).toISOString();
    onItemSelectRepeat({
      type:"Monthly",
      hour: currentDate
    })
  }
  pressDaily = () => {
    onItemSelectRepeat({
      type:"Daily",
      hour:  new Date('2023-11-05T02:00:00.000Z').toISOString()
    })
  }
  pressWeekly = () => {
    onItemSelectRepeat({
      type:"Weekly",
      hour:  new Date('2023-11-05T02:00:00.000Z').toISOString()
    })
  }
  pressMonthly = () => {
    onItemSelectRepeat({
      type:"Monthly",
      hour:  new Date('2023-11-05T02:00:00.000Z').toISOString()
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Repeated</Text>
      </View>
      <TouchableOpacity style={[styles.row1, styles.row11]}
      onPress={pressDaily}
      >
        <MaterialCommunityIcons
          name="calendar-today"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Daily</Text>
        <Text style={[styles.row1, styles.row12]}>{(repeat && repeat.type=="Daily" && repeat.hour) ? "✅" : "" }</Text>
        <Text style={[styles.row1, styles.row12]}></Text>
        <DateTimePicker
            testID="dateTimePicker"
            value={(repeat && repeat.type=="Daily" && repeat.hour) ? new Date(repeat.hour) : new Date('2023-11-05T02:00:00.000Z')}
            mode="time"
            is24Hour={true}
            onChange={handleDaily}
          />

      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}
      onPress={pressWeekly}
      >
        <MaterialCommunityIcons
          name="calendar-week"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Weekly</Text>
        <Text style={[styles.row1, styles.row12]}>{(repeat && repeat.type=="Weekly" && repeat.hour) ? "✅" : "" }</Text>
        <Text style={[styles.row1, styles.row12]}>Monday</Text>
        
        <DateTimePicker
            testID="dateTimePicker"
            value={(repeat && repeat.type=="Weekly" && repeat.hour) ? new Date(repeat.hour) : new Date('2023-11-05T02:00:00.000Z')}
            mode="time"
            is24Hour={true}
            onChange={handleWeekly}
          />

      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}
      onPress={pressMonthly}
      >
        <MaterialCommunityIcons
          name="calendar-month"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Monthly</Text>
        <Text style={[styles.row1, styles.row12]}>{(repeat && repeat.type=="Monthly" && repeat.hour) ? "✅" : "" }</Text>
        <Text style={[styles.row1, styles.row12]}>15th</Text>
        <DateTimePicker
            testID="dateTimePicker"
            value={(repeat && repeat.type=="Monthly" && repeat.hour) ? new Date(repeat.hour) : new Date('2023-11-05T02:00:00.000Z')}
            mode="time"
            is24Hour={true}
            onChange={handlMonthly}
          />

      </TouchableOpacity>
    </View>
  );
};

export default BSMRepeat;

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

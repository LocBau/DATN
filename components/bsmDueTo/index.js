import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const BSMDueTo = ({onItemSelectDueTo, due}) => {

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    onItemSelectDueTo(currentDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Due To</Text>
      </View>
      <DateTimePicker
            testID="dateTimePicker"
            value={due? new Date(due) : new Date(Date.now())}
            mode="datetime"
            is24Hour={true}
            onChange={onChangeDate}
          />

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

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const BSMRepeat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Repeated</Text>
      </View>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="calendar-today"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Daily</Text>
        <Text style={[styles.row1, styles.row13]}>09:00 </Text>
        <Text style={[styles.row1, styles.row14]}>Next day </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="calendar-week"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Weekly</Text>
        <Text style={[styles.row1, styles.row13]}>09:00 </Text>
        <Text style={[styles.row1, styles.row14]}>next-week </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="calendar-month"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Monthly</Text>
        <Text style={[styles.row1, styles.row13]}>09:00 </Text>
        <Text style={[styles.row1, styles.row14]}>next-mm </Text>
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

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const BSMDueTo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}> Due To</Text>
      </View>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="skip-next-circle"
          size={30}
          color="purple"
          marginHorizontal={5}
          marginVertical={5}
        />
        <Text style={[styles.row1, styles.row12]}>Tomorrow</Text>
        <Text style={[styles.row1, styles.row13]}>09:00 </Text>
        <Text style={[styles.row1, styles.row14]}>Next day </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="skip-forward"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Next Week</Text>
        <Text style={[styles.row1, styles.row13]}>09:00 </Text>
        <Text style={[styles.row1, styles.row14]}>dd-mm </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row1, styles.row11]}>
        <MaterialCommunityIcons
          name="calendar-cursor"
          size={30}
          color="purple"
          marginHorizontal={5}
        />
        <Text style={[styles.row1, styles.row12]}>Pick Time</Text>
        <Text style={[styles.row1, styles.row13]}>Click</Text>
        <View style={[styles.row1, styles.row14]}>
          <MaterialCommunityIcons
            name="arrow-top-right-thick"
            size={25}
            color="purple"
            marginHorizontal={5}
          />
        </View>
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

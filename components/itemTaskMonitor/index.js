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
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import BackGround from "../backGround";
import ItemPartTask from "../../components/itemPartTask";

const ItemTaskMonitor = ({ viewForHead, viewForBody, viewForFoot }) => {
  const weekstart = 19;
  const data = {
    title: "demo planning task",
    createtime: {
      weekday: "Mon",
      day: 20,
      month: 11,
      year: 2023,
    },
    dueTime: {
      weekday: "Thu",
      day: 24,
      month: 11,
      year: 2023,
    },

    late: false,
    done: false,
  };
  console.log("vo itemTaskMonitor");

  return (
    <View style={styles.container}>
      <View style={styles.titleTask}>
        <Text style={{ color: "blue" }}> title task</Text>
        {data.late ? (
          <MaterialIcons
            name="warning"
            size={18}
            color="yellow"
            style={{ marginLeft: 10 }}
          />
        ) : data.done ? (
          <MaterialCommunityIcons
            name="check-circle-outlin"
            size={18}
            color="green"
            style={{ marginLeft: 10 }}
          />
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.containerDuration}>
        <View style={styles.head}></View>
        <View style={styles.containerItemPart}>
          <ItemPartTask
            pos={viewForHead.pos}
            part={viewForHead.part}
            color={viewForHead.color}
          />
          <ItemPartTask
            pos={viewForBody.pos}
            part={viewForBody.part}
            color={viewForBody.color}
            lenght={viewForBody.lenght}
          />
          <ItemPartTask
            pos={viewForFoot.pos}
            part={viewForFoot.part}
            color={viewForFoot.color}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemTaskMonitor;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // height: 50,
    // width: 350, //91%
    // backgroundColor: "red",
    // alignItems: "center",
    flex: 1,
  },
  containerDuration: {
    flexDirection: "row",
    width: 360,
  },
  containerItemPart: {
    flexDirection: "row",
    height: 40,
    width: 350, //91%
    backgroundColor: "transparent",
    alignItems: "center",
  },
  titleTask: {
    flexDirection: "row",
    height: 25,
    width: 350,
    marginTop: 3,
    borderLeftWidth: 5,
    // borderBottomWidth: 1,
    borderLeftColor: "red",
    borderBottomColor: "blue",
    alignItems: "center",
  },
  head: {
    width: 5,
    height: 40,
    backgroundColor: "red",
  },
  body: {},
  foot: {},
  box1: {
    position: "relative",
    width: 50, //14.3%
    left: 0,
    backgroundColor: "black",
  },
  box2: {
    width: 50,
    backgroundColor: "blue",
  },
  box3: {
    position: "relative",
    width: 50,
    backgroundColor: "white",
  },
  box4: { position: "relative", width: 50, backgroundColor: "green" },
  box5: { position: "relative", width: 50, backgroundColor: "pink" },
  box6: { position: "relative", width: 50, backgroundColor: "purple" },
  box7: { position: "relative", width: 50, backgroundColor: "yellow" },
});

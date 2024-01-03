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

const ItemTaskMonitor = ({ data }) => {
  let length = 0;
  let pos = 0;
  if (data.start && data.end) {
    length = data.end - data.start + 1;
    pos = data.start;
    if(data.start == data.end) {
      length = 0;
    }
  } else if (data.start) {
    length = 8 - data.start;
    pos = data.start;
  } else if (data.end) {
    length = data.end;
    pos = 1;
  } else {
    pos = 1;
    length = 7;
  }
  if (data.outside) {
    length = 0;
    pos = 0;
  }
  console.log("dataaaaaa:", data.title);
  console.log("dataaa:", length);
  const viewForHead = {
    pos: data.start || 0,
    part: "head",
    color: "rgb(222, 156, 156)",
  };
  const viewForBody = {
    pos: pos,
    part: "body",
    color: "rgb(222, 156, 156)",
    lenght: length, // day
  };
  const viewForFoot = {
    pos: data.end || 0,
    part: "foot",
    color: "rgb(222, 156, 156)",
    lenght: "",
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTask}>
        <Text style={{ color: "blue" }}> {data.title}</Text>
        {data.late ? (
          <MaterialIcons
            name="warning"
            size={18}
            color="red"
            style={{ marginLeft: 10 }}
          />
        ) : data.done ? (
          <MaterialCommunityIcons
            name="check-circle-outline"
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
    marginVertical: 2,
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

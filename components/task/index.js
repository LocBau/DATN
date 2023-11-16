import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import UpdateTaskApi from "../../api/updateTaskApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Task = (props) => {
  // const { task } = props;
  const [checktask, setChecktask] = useState(props.status);
  const [favorite, setfavorite] = useState(props.favorite);
  let date = null;
  const handleCheck = async () => {
    

    
    props.onUpdate(props._id);
    
    props.trigger();
    if (checktask === false) {
      setChecktask(true);
    } else {
      setChecktask(false);
    }
  };
  const handleFavorite = async (favorite) => {
    
    props.onFavorite(props._id, favorite);
    setfavorite(favorite);
    props.trigger();
    
  };
  if (props.due) {
    date = new Date(props.due);
    date = "Due: " + date.getHours() + ":" + date.getMinutes();
  }
  const checktaskStyles =
    checktask == true ? styles.contentText1Done : styles.contentText1;
  const containerDoneStyle =
    checktask == false ? styles.container : styles.containerDone;

  function viewiconAttach() {
    if (props.attachfiles) {
      if (props.attachfiles.length > 0) {
        return (
          <MaterialIcons
            name="attach-file"
            size={18}
            color="blue"
            style={{ marginHorizontal: 4 }}
          />
        );
      } else if (props.attachfiles.length === 0) {
        return <Text></Text>;
      }
    }
  }

  return (
    <View style={[styles.container, containerDoneStyle]}>
      <View style={styles.status}>
        <TouchableOpacity onPress={handleCheck}>
          <MaterialCommunityIcons
            name={
              checktask === false
                ? "checkbox-blank-circle-outline"
                : "checkbox-marked-circle-outline"
            }
            size={30}
            color={checktask === false ? "red" : "green"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.contentText1, checktaskStyles]}>
          {props.title}
        </Text>
        <View style={styles.detailContent}>
          <Text style={styles.contentText2}>{props.due ? date : ""}</Text>
          {props.reminder ? (
            <MaterialIcons
              name="alarm"
              size={19}
              color="blue"
              style={{ marginHorizontal: 4 }}
            />
          ) : (
            ""
          )}
          {props.repeat ? (
            <MaterialIcons
              name="repeat-on"
              size={17}
              color="blue"
              style={{ marginHorizontal: 4 }}
            />
          ) : (
            ""
          )}
          {props.location ? (
            <MaterialIcons
              name="location-pin"
              size={18}
              color="blue"
              style={{ marginHorizontal: 4 }}
            />
          ) : (
            ""
          )}
          {viewiconAttach()}
        </View>
      </View>

      <View style={styles.icon}>
        {favorite ? 
        <MaterialIcons
        name="favorite"
        onPress={()=>{handleFavorite(false)}}
        size={20}
        color="red"
        style={{ marginHorizontal: 2 }}
      /> : <MaterialIcons
      onPress={()=>{handleFavorite(true)}}
      name="favorite-outline"
      size={20}
      color="red"
      style={{ marginHorizontal: 2 }}
    />}
      </View>
    </View>
  );
};

export default Task;

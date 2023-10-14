import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button, Switch, Input, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

const Menu = () => {
  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={64}
          rounded
          containerStyle={{ marginVertical: 10 }}
          source={{
            uri: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
          }}
        />
        <Text>Tran Bau Loc</Text>
      </View>
      <View>
        <Icon />
        <Text>My Day</Text>
      </View>
      <View>
        <Icon />
        <Text>Analytisc</Text>
      </View>
      <View>
        <Icon />
        <Text>Calendar</Text>
      </View>
      <View>
        <Icon />
        <Text>Task Location</Text>
      </View>
      <View>
        <Icon />
        <Text>Setting</Text>
      </View>
    </View>
  );
};

export default Menu;

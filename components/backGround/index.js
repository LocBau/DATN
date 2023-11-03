import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import { Image } from "@rneui/themed";
// import { ScrollView } from "react-native-virtualized-view";

const BASE_URI = "https://source.unsplash.com/random?sig=";
const BackGround = ({ onItemSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  //   const handleSelectItem = (item) => {
  //     setSelectedItem(item);
  //     console.log(item.source.uri);
  //   };
  return (
    <SafeAreaView>
      <FlatList
        data={[...new Array(30)].map((_, i) => i.toString())}
        style={styles.list}
        numColumns={3}
        keyExtractor={(e) => e}
        renderItem={({ item }) => (
          <Image
            source={{ uri: BASE_URI + item }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => {
              setSelectedItem(BASE_URI + item);
              console.log(selectedItem);
              onItemSelect(selectedItem); // gửi lên component cha là HomeScreen
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BackGround;

const styles = StyleSheet.create({
  list: {
    width: "100%",
    backgroundColor: "#000",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});

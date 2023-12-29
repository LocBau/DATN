import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import { Image } from "@rneui/themed";
import GetImgUrlApi from "../../api/getImgUrlApi";
// import { ScrollView } from "react-native-virtualized-view";

const BASE_URI = "https://source.unsplash.com/random?sig=";
const BackGround = ({ onItemSelect }) => {
  const [sourcei, setSourcei] = useState([]);
  const [f,setF] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  //   const handleSelectItem = (item) => {
  //     setSelectedItem(item);
  //     console.log(item.source.uri);
  //   };
  useEffect(()=> {
    if(!f) return; 
    console.log("asdasdsa");
    async function proc () {
      setF(false);
      let l = [];
      for (let i = 0; i < 6; i++) {
        console.log(BASE_URI+i);
        let p = await GetImgUrlApi(BASE_URI+i);
        l.push(p);
        // setSourcei(l);
      }
      console.log(l);
      setSourcei(l);
      
      }
      proc();
  },[f])
  return (
    <SafeAreaView>
      <FlatList
        data={sourcei.map((_, i) => i.toString())}
        style={styles.list}
        numColumns={3}
        keyExtractor={(e) => e}
        renderItem={({ item }) => (
          <Image
            source={{ uri: sourcei[item]}}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => {
              setSelectedItem(sourcei[item]);
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

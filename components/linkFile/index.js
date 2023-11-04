import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
const LinkFile = ({navigation, route}) => {
  useEffect(()=> {
    pickDocument();
  },[])
  const  [file, setFile] = useState(null);
  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result){
      console.log(result.assets[0]);
      setFile(result.assets[0]);
    }
    
    
  };
  
  const saveLinkFile = () => {
    let task = route.params.task;
    if (task.attachments) {
      task.attachments.push({uri: file.uri, name: file.name});
    } else {
      task.attachments = [{uri: file.uri, name: file.name}];
    }
    navigation.navigate("DetailTask",{
      task:task
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View >
        <TouchableOpacity>
          <Button
            title="choose other files"
            color="black"
            onPress={pickDocument}
          />
          <Text>
            {file ? file.name : ""}
          </Text>
          <Button 
          title="Link file" 
          onPress={saveLinkFile}
    />
          <Button 
          title="Back to task" 
          onPress={()=>navigation.navigate("DetailTask",{
      task:route.params.task
    })} 
    />
        </TouchableOpacity>
    </View>
    </View>
  );
};



export default LinkFile;
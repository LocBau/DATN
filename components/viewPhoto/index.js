import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'


export default function ViewPhoto(props) {
  console.log(props);
  const [capturedImage, setCapturedImage] = React.useState({"height": 4224, "uri": "file:///var/mobile/Containers/Data/Application/15324D19-CF83-4887-8C74-124D25E4F6DD/Library/Caches/ExponentExperienceData/%2540trunktran%252FTimeTable_App/Camera/C986F5C6-DACD-4377-B611-289B5236C73D.jpg", "width": 2176})




  return (
    <View style={styles.container}>

          {capturedImage ? (
            <CameraPreview photo={capturedImage}  />
          ) : (
            <View>
              <Text>No photo</Text>
            </View>
          )}
        


      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({photo}) => {

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            
            <TouchableOpacity
              // onPress={deletePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Delete picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import Permissions from "expo-permissions"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef } from "react";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from 'expo-media-library'
// import { withNavigationFocus } from 'react-navigation';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterAED = (props) => {
  let camera = null
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);

  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState(null);

  const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (!permission) ... 

  //if (!permission.granted) ... 


  const setCurrentLocation = async () => {
    console.log("inside setCurrentLocation")
    let locationPermission = await Location.requestBackgroundPermissionsAsync()
    console.log("setting location permission", locationPermission)
    if (locationPermission !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  useEffect(() => {
    (async () => {
      try {
        console.log("inside useEffect...")

        const cameraPermission = await Camera.requestCameraPermissionsAsync()
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
        console.log("setting camera permission", cameraPermission)
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        setCurrentLocation()
      } catch (error) {
        console.log(error)
      }

    })();
  }, []);
  if (hasCameraPermission === "undefined") { return <Text>Requesting for permission</Text> }
  else if (!hasCameraPermission) { return <Text>Permission denied</Text> }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    // if (!camera) return
    // Camera.current.takePictureAsync().then(onPictureSaved);
    const result = await cameraRef.current.takePictureAsync(options);
    console.log(result)
    setPhoto(result)
  }

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }

    let savePic = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }


    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title={"Share"} onPress={() => sharePic()} />
        {hasMediaLibraryPermission ? <Button title={"Save Pic"} onPress={savePic} /> : ""}
        <Button title={"Discard"} onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    )
  }

  // const onPictureSaved = ({ uri, width, height, exif, base64 }) => {
  //   console.log(uri);
  // }




  return (
    <View style={styles.container}>

      {isFocused &&
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            {location ? <Text>latitude = {location.coords.latitude}</Text> : null}
            {location ? <Text>longitude = {location.coords.longitude}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={{ color: 'black' }}>Flip Camera</Text>
            </TouchableOpacity>
            <Button title={"Take Pic"} onPress={takePicture} />
          </View>
        </Camera>
        // <Text style={styles.paragraph}>{text}</Text>
      }

    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'black',
    padding: 8,
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  buttonContainer:
  {
    backgroundColor: 'white',
    marginBottom: 20,
    alignSelf: 'center'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});
export default RegisterAED;



// *** CLASS COMPONENT CODE ***

// export default class RegisterAED extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   camera = null
//   // const[type, setType] = useState(CameraType.back);
//   type = CameraType.back
//   // const[permission, requestPermission] = Camera.useCameraPermissions();

//   // if (!permission) ... 

//   //if (!permission.granted) ... 
//   // const camera = useRef(null);
//   toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }
//   takePicture = async () => {
//     if (!camera) return
//     // Camera.current.takePictureAsync().then(onPictureSaved);
//     const result = await camera.takePictureAsync();
//     console.log(result)
//   }
//   onPictureSaved = ({ uri, width, height, exif, base64 }) => {
//     console.log(uri);
//   }

//   render() {
//     return (
//       <View style={styles.container}>

//         <Camera style={{ flex: 1 }} type={this.type} ref={(r) => {
//           this.camera = r
//         }}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={this.toggleCameraType}>
//               <Text style={{ color: 'black' }}>Flip Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={this.takePicture}>
//               <Text style={{ color: 'black' }}>Take Picture</Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       </View>
//     )
//   };
// }
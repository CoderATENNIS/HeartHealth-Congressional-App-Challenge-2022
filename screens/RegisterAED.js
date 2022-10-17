import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ActivityIndicator, TouchableHighlight } from "react-native";
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
import {firebase} from "../config"

// import { firebase } from "../firebaseConfig";
import { getStorage, ref, uploadString, uploadBytes, listAll } from "firebase/storage";
import { initializeApp } from "firebase/app"
import * as ImagePicker from 'expo-image-picker';


const config = {
  apiKey: "AIzaSyBFWGhe8q4UV633SSdL8lNrsHTbvSlVqKo",
  authDomain: "heartapp-4cb6e.firebaseapp.com",
  projectId: "heartapp-4cb6e",
  storageBucket: "heartapp-4cb6e.appspot.com",
  messagingSenderId: "247795002288",
  appId: "1:247795002288:web:d11c71a6ad8645892e4475"
};

initializeApp(config)

// const storage = getStorage(app)

const RegisterAED = (props) => {
  // Create a root reference
  // const storage = getStorage();
  // console.log("firebase", firebase)
  // const storage = firebase.storage();
  // const storage = getStorage(app);
  // var storage1 = firebase.app().storage("gs://my-custom-bucket");

  // console.log("storage ##############", storage)
  // console.log("storage ##############", storage1)

  let camera = null
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState();
  const [uploading, setUploading] = useState(false)

  const [location, setLocation] = useState(null);

  const[clickedOnButton,setOnClicked]=useState(false);

  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState(null);

  const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (!permission) ... 

  //if (!permission.granted) ... 
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("inside !result.cancelled")
      const storage = getStorage(); //the storage itself
      console.log("#### storage.....", storage)

      const refer = ref(storage, 'Pictures/image.jpg'); //how the image will be addressed inside the storage
      console.log("ref....###", refer)

      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      console.log("uri....###", result.uri)


      uploadBytes(refer, bytes).then((snapshot) => {
        console.log('Uploaded an array!');
      }); //upload images
    }
  };

  const uploadImage = async () => {
    // Create a reference under which you want to list
    console.log("... in upload")


    // const ref = storage.ref().child(`Pictures`)
    const storage = getStorage();
    const reference = ref(storage, `Pictures/_main.png`);
    // Create a reference under which you want to list
    // const listRef = ref(storage, 'Pictures');
    console.log("ref... ", reference)

    console.log("photo uri", photo.uri)

    const img = await fetch(photo.uri);
    const blob = await img.blob();
    // console.log(blob)
    // const newFile = new File([blob], `hello.jpg`, {
    //   type: 'image/jpg',
    // })
    uploadBytes(reference, blob).then((snapshot) => {
      console.log('Uploaded an array!');
    });;
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function () {
    //     reject

    //       (new TypeError('Network request failed'));
    //   };
    //   xhr.responseType = 'blob';
    //   xhr.open('GET', photo.uri, true);
    //   xhr.send(null);
    // })

    // const snapshot = ref.put(blob)
    // snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   () => {
    //     console.log("...setUploading")
    //     setUploading(true)
    //   },
    //   (error) => {
    //     console.log("...erro")
    //     setUploading(false)
    //     console.log(error)
    //     blob.close()
    //     return
    //   },
    //   () => {
    //     console.log("...done")
    //     snapshot.snapshot.ref.getDownloadURL().then((url) => {
    //       setUploading(false)
    //       console.log("Download URL: ", url)
    //       setImage(url)
    //       blob.close()
    //       return url
    //     })
    //   }
    // )

    // const videoRef = firebase.storage().ref("video/filename");



  }

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
   text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  
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
    console.log(result.uri)
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
              
              <Button title='Upload Image' onPress={uploadImage} />
              <ActivityIndicator size={'small'} color='black' />
      
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title={"Share"} onPress={() => sharePic()} />
        {hasMediaLibraryPermission ? <Button title={"Save Pic"} onPress={savePic} /> : ""}
        <Button title={"Discard"} onPress={() => setPhoto(undefined)} />
        {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />}
      </SafeAreaView>
 
     

    )
  }

  // const onPictureSaved = ({uri, width, height, exif, base64}) => {
  //   console.log(uri);
  // }


if(clickedOnButton==true)
{
  
}

  return (
    
    <View style={styles.container}>
  <TouchableOpacity >
<Button title="Click to take pic" onPress={()=>{
    setOnClicked(true)
  }}></Button>

  </TouchableOpacity>
  <TouchableOpacity >
<Button title="Click to return back" onPress={()=>{
    setOnClicked(false)
  }}></Button>

  </TouchableOpacity>
  

      {isFocused && clickedOnButton &&
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            {location ? <Text>latitude = {location.coords.latitude}</Text> : null}
            {location ? <Text>longitude = {location.coords.longitude}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={{ color: 'black' }}>Flip Camera</Text>
            </TouchableOpacity>
            <Button title={"Take Pic"} onPress={takePicture} />
            <TouchableHighlight onPress={pickImage}>
              <Text>select image</Text>
            </TouchableHighlight>
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
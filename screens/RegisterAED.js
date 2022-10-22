import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ActivityIndicator, TouchableHighlight, TextInput } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef } from "react";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
// import { firebase } from "../firebaseConfig";
import { getStorage, ref, uploadString, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { app, firebase, db } from '../config';
import * as geofirestore from 'geofirestore';

app
firebase.initializeApp({
  apiKey: "AIzaSyBFWGhe8q4UV633SSdL8lNrsHTbvSlVqKo",
  authDomain: "heartapp-4cb6e.firebaseapp.com",
  projectId: "heartapp-4cb6e",
  storageBucket: "heartapp-4cb6e.appspot.com",
  messagingSenderId: "247795002288",
  appId: "1:247795002288:web:d11c71a6ad8645892e4475"
})
// Create a Firestore reference
const firestore = firebase.firestore();
// Create a GeoFirestore reference
const GeoFirestore = geofirestore.initializeApp(firestore);
// Create a GeoCollection reference
const geocollection = GeoFirestore.collection('aed');
// const app = initializeApp(config)
// const app = null
// const db = getFirestore(app);

// const storage = getStorage(app)

const RegisterAED = (props) => {
  // const storage = getStorage();

  let cameraRef = useRef()
  const [textNotes, setTextNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [hasClickedButton, setHasClickedButton] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState();
  const [uploading, setUploading] = useState(false)

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState(null);

  const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

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
    const storage = getStorage();
    // Create a reference under which you want to list
    const reference = ref(storage, `Pictures/_main.png`);
    const img = await fetch(photo.uri);
    const blob = await img.blob();
    const uploadTask = uploadBytesResumable(reference, blob)

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL)
        });
      }
    );
  }

  // Saving data into Firebase
  const saveData = () => {
    console.log(location.coords.latitude, location.coords.longitude)
    const data = {
      comments: textNotes,
      imageUri: imageUrl,
      address: address,
      // name: 'Geofirestore',
      // score: 100,
      // The coordinates field must be a GeoPoint!
      coordinates: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude)
    }
    // {
    //   comments: textNotes,
    //   imageUri: imageUrl,
    //   coodinates: new firebase.firestore.GeoPoint(25.828837892064666, 74.36233797117542),
    //   address: address
    // }
    try {
      // const docRef = await addDoc(collection(db, "aed"), data);
      // Add a GeoDocument to a GeoCollection
      geocollection.add(data)

      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  // (async () => {

  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);

  const setCurrentLocation = async () => {
    console.log("inside setCurrentLocation")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords)
    setLocation(location);
    console.log("location...", location)
    console.log("address...", address, `${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country} pin - ${address[0].postalCode}`)
    setAddress(`${address[0].name}, ${address[0].city}, ${address[0].region}, ${address[0].country}, ${address[0].postalCode}`)
  };


  useEffect(() => {
    (async () => {
      try {
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
      quality: 0.1,
      base64: true,
      exif: false,
      skipProcessing: false
    };
    const result = await cameraRef.current.takePictureAsync(options);
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
        {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />}
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        width: 100,
        height: 65,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        border: "2px solid black"
        , borderWidth: 2,
        borderRadius: 15,
        marginTop: "0.1%"
      }} onPress={() => setHasClickedButton(true)}
      ><Text style={{ color: "red", }}>Click me to take photo</Text></TouchableOpacity>

      <TouchableOpacity style={{
        width: 100,
        height: 65,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        border: "2px solid black"
        , borderWidth: 2,
        borderRadius: 15,
      }} onPress={() => setHasClickedButton(false)}
      >
        <Text style={{ color: "red", }}>Click me to go back</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={pickImage}>
        <Text>select image</Text>
      </TouchableHighlight>
      <TextInput style={{ backgroundColor: "black", color: "red" }} onChangeText={(notes) => (setTextNotes(notes))}></TextInput>

      <TouchableOpacity onPress={saveData}>
        <Text>Submit Information</Text>
      </TouchableOpacity>
      {isFocused && hasClickedButton ? (<Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          {location ? <Text>latitude = {location.coords.latitude}</Text> : null}
          {location ? <Text>longitude = {location.coords.longitude}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={{ color: 'black' }}>Flip Camera</Text>
          </TouchableOpacity>
          <Button title={"Take Pic"} onPress={takePicture} />
        </View>
      </Camera>)
        : (<Text></Text>)
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
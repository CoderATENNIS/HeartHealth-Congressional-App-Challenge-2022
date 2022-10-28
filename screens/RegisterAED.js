import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableHighlight, TextInput, KeyboardAvoidingView } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef } from "react";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
import { getStorage, ref, uploadString, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { app, firebase, db } from '../config';
import * as geofirestore from 'geofirestore';
import CameraUri from '../assets/cameraIcon.jpg'
import SelectImage from '../assets/SelectImage.png'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

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
// Create a GeoFirestore referencee
const GeoFirestore = geofirestore.initializeApp(firestore);
// Create a GeoCollection reference
const geocollection = GeoFirestore.collection('aed');

const RegisterAED = (props) => {
  // const storage = getStorage();
  let cameraRef = useRef()
  const [textNotes, setTextNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
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
        setPhoto(undefined)
        setOpenCamera(false)
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading(true)
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
          setUploading(false)
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
      // The coordinates field must be a GeoPoint!
      coordinates: new firebase.firestore.GeoPoint(location.coords.latitude + 0.01, location.coords.longitude)
    }
    // if(imageUrl =="")
    try {
      // const docRef = await addDoc(collection(db, "aed"), data);
      // Add a GeoDocument to a GeoCollection
      geocollection.add(data)
      setSnackbarVisibility(true)
      setTextNotes("")
      setImageUrl("")

      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

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
    // let sharePic = () => {
    //   shareAsync(photo.uri).then(() => {
    //     setPhoto(undefined)
    //   })
    // }

    // const savePic = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined)
    //   })
    // }

    return (
      <SafeAreaView style={styles.container}>
        {/* <Button title={"Discard"} onPress={() => setPhoto(undefined)} /> */}

        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "25%", marginTop: 16 }}>
          <TouchableOpacity style={{
            // width: 100,
            // height: 65,
            justifyContent: "center",
            padding: 12,
            // marginTop: -60
          }} onPress={() => setPhoto(undefined)}
          >
            <Entypo name="cross" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            // width: 100,
            // height: 65,
            justifyContent: "center",
            padding: 12,
            // marginTop: -60
          }} onPress={uploadImage}
          >
            <Feather name="check" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* <Button title={"Share"} onPress={() => sharePic()} /> */}
        {/* {hasMediaLibraryPermission ? <Button title={"Save Pic"} onPress={savePic} /> : ""} */}
        {/* {uploading ? <ActivityIndicator size={'small'} color='black' /> : <Button title='Upload Image' onPress={uploadImage} />} */}
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Snackbar
        visible={snackbarVisibility}
        onDismiss={() => setSnackbarVisibility(false)}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
        style={{ backgroundColor: "#960606" }}
      ><View>
          <Text style={{ color: "white" }}>New AED has been registered successfully!!</Text></View>
      </Snackbar>
      {!openCamera ? (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 100 }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={pickImage} style={{
                width: 120,
                height: 80,
                backgroundColor: "white",
                display: "flex",
                border: "2px solid black"
                , borderWidth: 2,
                borderRadius: 15,
                marginRight: 48
              }}>
                <Image source={SelectImage} style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                  marginTop: "2%",
                  postitionY: '0'
                }} />
              </TouchableOpacity>
              <Text style={{ marginTop: 4, marginRight: 48 }}>Upload</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={{
                width: 120,
                height: 80,
                backgroundColor: "white",
                display: "flex",
                border: "2px solid black",
                borderWidth: 2,
                borderRadius: 15,
              }} onPress={() => setOpenCamera(true)}
              >
                <Image source={CameraUri} style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                  marginTop: "2%",
                  postitionY: '0'
                }} />
              </TouchableOpacity>
              <Text style={{ marginTop: 4 }}>Take Photo</Text>
            </View>
          </View>
          <View>
            {photo ? <Image source={{ uri: "data:image/jpg;base64," + photo.base64 }} /> : ""}

            {address ? <View style={{ alignItems: "center" }} >
              <Text style={{ fontSize: 22, fontWeight: "400" }}>Current Address</Text>
              <Text style={{ padding: 12 }}>{address}</Text>
            </View> : null}
            <Text style={{ alignSelf: 'center', fontSize: 22, fontWeight: "400", marginTop: 36 }}>Comments</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput style={styles.input_box} value={textNotes} onChangeText={(notes) => (setTextNotes(notes))}></TextInput>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={saveData} style={styles.buttons}>
              <Text style={{ color: "white" }}>Register AED</Text>
            </TouchableOpacity>
          </View>
        </View>) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
            <TouchableOpacity style={{
              // width: 100,
              // height: 65,
              justifyContent: "center",
              padding: 12
            }} onPress={() => setOpenCamera(false)}
            >
              <Ionicons name={'arrow-back-outline'} size={"32px"} />
            </TouchableOpacity>
            <Button style={{ padding: 12 }} title={"Flip Camera"} onPress={toggleCameraType} />
          </View>
          <Camera style={{ flex: 1 }} type={type} ref={cameraRef}></Camera>
          <TouchableOpacity style={{
            // width: 100,
            // height: 65,
            alignItems: "center",
            // justifyContent: "center",
            margin: 16,
            padding: 12,
            backgroundColor: "#960606"
          }} onPress={takePicture}
          >
            <Text style={{ color: "white" }}>Take Photo</Text>
          </TouchableOpacity>
          {/* <Button style={{ backgroundColor: "red", color: "yellow" }} title={"Take Photo"} /> */}
        </>)
      }

    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'light grey',
    flex: 1
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  input_box: {
    backgroundColor: "white",
    color: "black",
    margin: 8,
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 12,
    padding: 10,
    multiline: true
  },
  buttonContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
    alignSelf: 'center'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  buttons: {
    backgroundColor: "#960606",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 48,
    borderRadius: 15,
    margin: 10,
    width: 150,
    height: 50,
    alignSelf: 'center'
  },
});
export default RegisterAED;
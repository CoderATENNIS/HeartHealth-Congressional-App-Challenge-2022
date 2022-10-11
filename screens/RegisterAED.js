import React, { Component, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Image,SafeAreaView,Button } from "react-native";
import Permissions from "expo-permissions"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Camera, CameraType } from 'expo-camera';
import { useEffect,useRef } from "react";
import { shareAsync } from "expo-sharing";
import MediaLibrary from 'expo-media-library'



const RegisterAED =()=>{
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

 // if (!permission) ... 

  //if (!permission.granted) ... 

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
function takePicture(){
  Camera.current.takePictureAsync()
  .then(onPictureSaved);



}
const onPictureSaved = ({ uri, width, height, exif, base64 }) => {
  console.log(uri);
}


  return (
    <View style={styles.container}>
      
      <Camera style={{flex:1}} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={{color:'black'}}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={{color:'black'}}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
 /*let cameraRef= useRef();
 const cameraPermission= await Camera.useCameraPermissions();
const {hasCameraPermissions,setHascameraPermissions}=useState();
const {hasMediaLibraryPermissions,setHasMediaLibraryPermissions}=useState();
const[photo,sePhoto]= useState();
useEffect(()=>{

(async () =>{

//const mediaLibraryPermission= await MediaLibrary.requestPermissionAsync();
setHasCameraPermissions(cameraPermissions.status==="granted");
//setHasMediaLibraryPermissions(mediaLibraryPermissions.status==="granted");
})();
},[])

let takePic = async () =>{
let options={
  quality:1,
  base64:true,
  exif:false
}

let newPhoto = await cameraRef.current.takePictureAsync(options);
setPhoto(newPhoto);
}

if(photo){
let sharePic=()=>{
shareAsync(photo.uri).then(() =>{
  setPhoto(undefined)
})
}
let savePhoto=()=>{
MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{
  setPhoto(undefined);
})
}
return(
  <SafeAreaView style={style.container}>

<Image style={styles.preview} source={{uri:"data:image/jpg;base64,"+photo.base64}}/>
<Button title="Share" onPress={sharePic}/>
{hasMediaLibraryPermissions ? <Button title="save" onPress={savePhoto}/>:undefined}
<Button title="Discard" onPress={()=> setPhoto(undefined)}/>
</SafeAreaView>  
  )

}

if(hasCameraPermissions === undefined){
  return <Text>
    Requesting Permission... 
  </Text>
} else if(!hasCameraPermissions){
  return <Text>Permission for camera not granted. Please change in settings</Text>
}

    return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={
          styles.buttonContainer

        }>
<TouchableOpacity onPress={this.takePic()}>
  <Text>Take Picture of AED</Text>
</TouchableOpacity>


        </View>
        


      </Camera>
   );*/ 
  }


const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  buttonContainer:
  {
    backgroundColor:'white',
    marginBottom:20,
    alignSelf:'center'
  },
  preview:{
    alignSelf:'center',
    flex:1
  }
});
export default RegisterAED;
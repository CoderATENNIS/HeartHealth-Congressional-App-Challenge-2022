import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,FlatList } from 'react-native';
// import Device from 'expo-device';
import * as Location from 'expo-location';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
import { app, firebase, db } from '../config';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import CustomRow from '../CustomRow'


// firebase.initializeApp({
//   apiKey: "AIzaSyBFWGhe8q4UV633SSdL8lNrsHTbvSlVqKo",
//   authDomain: "heartapp-4cb6e.firebaseapp.com",
//   projectId: "heartapp-4cb6e",
//   storageBucket: "heartapp-4cb6e.appspot.com",
//   messagingSenderId: "247795002288",
//   appId: "1:247795002288:web:d11c71a6ad8645892e4475"
// })
app
export default function FindAEDScreen() {

  // Create a Firestore reference
  const firestore = firebase.firestore();
  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);
  // console.log(GeoFirestore)
  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('aed');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
const[displayData,setDisplayData]= useState(null)


/*const CustomRow = ({ title, description, image_url }) => (
  <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.photo} />
      <View style={styles.container_text}>
          <Text style={styles.title}>
              {title}
          </Text>
          <Text style={styles.description}>
              {description}
          </Text>
      </View>

  </View>
);*/

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // // Add a GeoDocument to a GeoCollection
      // geocollection.add({
      //   name: 'Geofirestore',
      //   score: 100,
      //   // The coordinates field must be a GeoPoint!
      //   coordinates: new firebase.firestore.GeoPoint(25.828837892064666, 74.36233797117542)
      // })

      console.log("fetching aed details")
      // const querySnapshot = await getDocs(collection(db, "aed"));
      // console.log("aed details", querySnapshot)

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} =>`, doc.data());
      // });


      // Create a GeoQuery based on a location numer=amount of miles
      const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude), radius: 100 });

      // Get query (as Promise)

      query.get().then((value) => {
        // All GeoDocument returned by GeoQuery, like the GeoDocument added above
        setDisplayData(value.docs);
        
      });
//create state in this query function to store information and then in render render all the aeds 
 

    })();
  }, []);



  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

  }
  const CustomListview = ({ displayData }) => (
    <View style={styles.container}>
        <FlatList
                data={displayData}
                renderItem={({ item }) => <CustomRow
                    address={item.address}
                    comments={item.comments}
                    imageUri={item.imageUri}
                />}
            />
  
    </View>
  );
  /*db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})*/

//const docRef = await addDoc(collection(firestore,"AED_INFO" ), {
 //   location:location,
      
//});
  return (
    <View style={styles.container}>
      
      <CustomListview
          itemList={displayData}
        />


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: "black"
  },
  title: {
    fontSize: 16,
    color: '#000',
},
container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
},
description: {
    fontSize: 11,
    fontStyle: 'italic',
},
photo: {
    height: 50,
    width: 50,
},
});

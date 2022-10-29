import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
import { app, firebase, db } from '../config';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { Ionicons } from '@expo/vector-icons';
import CustomRow from '../CustomRow'

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
  const [displayData, setDisplayData] = useState([])
  const [openMap, setOpenMap] = useState(false)
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


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

      // Create a GeoQuery based on a location numer=amount of miles
      const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude), radius: 100 });

      // Get query (as Promise)
      query.get().then((value) => {
        // All GeoDocument returned by GeoQuery, like the GeoDocument added above
        const records = value.docs.slice(0, 5);
        // console.log("docs", value.docs)
        // console.log("docs", records.map(x => x.data()))
        setDisplayData(records.map(x => x.data()));
        // console.log("region", region)
      });
    })();
  }, []);

  const onRegionChange = (region) => {
    console.log("region change", region)
    setRegion(region);
  }

  const getDirection = (lat, long, address) => {
    console.log(lat, long)
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setOpenMap(true)
  }

  const Item = ({ data }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {/* <Image source={{ uri: data.imageUri }} style={styles.photo} /> */}
        <Text style={{ margin: 18, marginRight: 48 }}>{data?.address}</Text>
        {/* <Text>{data?.coordinates?._lat}, {data?.coordinates?._long}</Text> */}
        <TouchableOpacity style={{
          // width: 100,
          // height: 65,
          alignItems: "center",
          // justifyContent: "center",
          margin: 16,
          padding: 12,
          borderRadius: 2,
          backgroundColor: "#960606"
        }} onPress={() => getDirection(data?.coordinates?._lat, data?.coordinates?._long, data.address)}
        >
          <Text style={{ color: "white" }}>Direction</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Image source={{ uri: data.imageUri }} style={styles.photo} />
        <Text style={{ margin: 18, marginRight: 48 }}>{data?.comments}</Text>
      </View>

    </View>
  );

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
  const renderItem = ({ item }) => <Item data={item} />;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      {openMap ?
        <View>
          <TouchableOpacity style={{
            // width: 100,
            // height: 65,
            justifyContent: "center",
            padding: 12
          }} onPress={() => setOpenMap(false)}
          >
            <Ionicons name={'arrow-back-outline'} size={"32px"} />
          </TouchableOpacity>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={onRegionChange}
          >
            {displayData.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.coordinates._lat, longitude: marker.coordinates._long }}
                title={"Address"}
                description={marker.address}
              />
            ))}
          </MapView>
        </View>
        :
        <FlatList data={displayData} renderItem={renderItem} keyExtractor={(item, index) => index} />
      }

      {/* <CustomListview
        itemList={displayData}
      /> */}



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: "90%",
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: "black"
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 4,
    // marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
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

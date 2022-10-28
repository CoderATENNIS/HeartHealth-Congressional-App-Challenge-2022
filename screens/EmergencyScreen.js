import React, { useState, useEffect } from "react";
import { View } from "react-native";


import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../CarouselCardItem'
import data from '../data'
import { firebase } from '../config';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import * as Location from 'expo-location';

const EmergencyScreen = () => {
  // Create a Firestore reference
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('aed');

  const [index, setIndex] = React.useState(0)
  const [cprSteps, setCprSteps] = React.useState(data)
  const isCarousel = React.useRef(null)

  useEffect(() => {
    (async () => {
      console.log("in use effect")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // Create a GeoQuery based on a location numer=amount of miles
      const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location.coords.latitude, location.coords.longitude), radius: 100 });
      // Get query (as Promise)
      query.get().then((value) => {
        // All GeoDocument returned by GeoQuery, like the GeoDocument added above
        const records = value.docs[0].data();
        console.log(records.address)
        data[3].body = "Make eye contact with the nearest bystander and tell them to drive to nearest AED \n\nAddress: " + records.address
        setCprSteps(data)

      });
    })();
  }, []);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={cprSteps}
        renderItem={CarouselCardItem}
        sliderWidth={375}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}

      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}

export default EmergencyScreen

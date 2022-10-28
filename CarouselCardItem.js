import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Linking } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

dialCall = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
  else { phoneNumber = `telprompt:${number}`; }
  Linking.openURL(phoneNumber);
};


const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 24,
          // marginBottom: 450,
          padding: 12
        }}
        onPress={() => { dialCall(9176202718) }}
      >
        <Text style={{ color: "white" }}>Touch this button to call 911</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 600
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,

  },
  header: {
    color: "#222",
    fontSize: 24,
    fontWeight: "bold",
    // paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    padding: 16,
  }
})

export default CarouselCardItem
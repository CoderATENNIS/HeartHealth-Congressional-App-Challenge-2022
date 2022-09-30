import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class CommunityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Community Screen</Text>
      </View>
    );
  }
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
  }
});

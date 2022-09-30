import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {Video} from 'expo-av'
import { StatusBar } from "expo-status-bar";
import { render } from "react-dom";
import YoutubePlayer from "react-native-youtube-iframe"

export default class TrainingScreen extends React.Component{
 render(){
    return (

<View>

  
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
  },
  video:{
    flex:1,
    alignSelf:'stretch'
  },
  buttons:{
    margin:16
  }
});

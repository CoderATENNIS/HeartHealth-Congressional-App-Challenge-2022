import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import logo from '../assets/HeartLogo.png'
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Emergency')
          }
          style={styles.roundButton2}>
          <Text style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "2px",
            textAlign: "center"
          }}>Emergency SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
          onPress={() => this.props.navigation.navigate('Education')}>
          <Text style={styles.textButton}>EDUCATION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
          onPress={() => this.props.navigation.navigate('Register AED')}>
          <Text style={styles.textButton}>REGISTER AED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
          onPress={() => this.props.navigation.navigate('Find AED')}>
          <Text style={styles.textButton}>FIND AED</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 65,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    border: "2px solid black"
    , borderWidth: 2,
    borderRadius: 15,
    marginTop: "0.1%"
  },

  roundButton2: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#960606',
  },

  button2: {
    width: "80%",
    height: 65,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    border: "2px solid black",
    marginTop: 18,
    borderWidth: 2,
    borderRadius: 15,
  },

  textButton: {
    color: "red",
    fontSize: "20px",
    fontWeight: "2px",
    textAlign: "center"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'light grey',
    padding: 8,
    width: '100%'
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
    postitionY: '0'
  }
})
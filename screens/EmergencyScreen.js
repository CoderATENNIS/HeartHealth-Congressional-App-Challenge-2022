import React from "react";
import {Linking,Platform,TouchableOpacity,Text,Image,StyleSheet,View} from "react-native";
import CPRAnimation from '../assets/CPR.gif'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
 const RootStack = createStackNavigator();
export default class EmergencyScreen extends React.Component{
render(){
        return(
          
          <View style={styles.container}>
            
            <Text>1. After the person has collapsed, check for a pulse</Text>
            <Text>2. If you feel that they have no pulse then call 911 using the button below</Text>
 <TouchableOpacity
                   style={{
                   height: 30,
                   width: 250,
                   backgroundColor: "red",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5,
                   marginLeft:50,
                   marginBottom:450
                   }}
                 onPress={()=>{dialCall(9176202718)}}
                >
                  
                <Text>Touch this button to call 911</Text>
                </TouchableOpacity>

<Image style ={{width: "100%", height:"20%",marginTop:-410}} source={CPRAnimation}/>


<Text>3. Begin chest compressions. Place the heel of one hand on the sternum and the other directly on top. Press fast and hard at a rate of 100 compressions per minute.</Text>

          </View>
               
                
                





              )
  }

}


const styles= StyleSheet.create({


  button:{
  
  width:100,
  height:65,
  backgroundColor:"white",
  display:"flex",
  justifyContent:"center",
  alignSelf:"center",
  border:"2px solid black"
  , borderWidth: 2,
      borderRadius: 15,
      marginTop:"0.1%"
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
  
  
  button2:{
  
  width:"80%",
  height:65,
  backgroundColor:"white",
  display:"flex",
  justifyContent:"center",
  alignSelf:"center",
  border:"2px solid black",
  marginTop:18,
   borderWidth: 2,
      borderRadius: 15,
  },
  
  
  textButton:{
  
  color:"red",
  fontSize:"20px",
  fontWeight:"2px",
  textAlign:"center"
  
  
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'grey',
      padding: 8,
      width:'100%'
  
    },
    image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain',
      marginTop:"10%",
      postitionY:'0'
  }
  
  
  
  
  
  })
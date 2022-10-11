import React from "react";
import {Linking,Platform,TouchableOpacity,Text} from "react-native";

 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
 
export default class ProfileScreen extends React.Component{
render(){
        return(
                <TouchableOpacity
                   style={{
                   height: 30,
                   width: 250,
                   backgroundColor: "red",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5,
                   marginLeft:50,
                   marginTop:100
                   }}
                 onPress={()=>{dialCall(9176202718)}}
                >
                <Text>Touch this button to call 911</Text>
                </TouchableOpacity>
              )
  }

}

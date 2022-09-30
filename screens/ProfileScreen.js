import React from "react";
import {Linking,Platform,TouchableOpacity,Text} from "react-native";

 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
 
export default class App extends React.Component{
render(){
        return(
                <TouchableOpacity
                   style={{
                   height: 30,
                   width: 30,
                   backgroundColor: "#329df4",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5,
                   marginLeft:50,
                   marginTop:100
                   }}
                 onPress={()=>{dialCall(2079079500)}}
                >
                <Text>Phone</Text>
                </TouchableOpacity>
              )
  }

}

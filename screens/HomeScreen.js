import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image } from "react-native";
import logo from '../assets/HeartLogo.png'
export default class HomeScreen extends Component {
  render() {
    return (
        
      <View style={styles.container}>
        <Image source={logo} style={styles.image} /> 
      
        <TouchableOpacity
        onPress={()=>
          this.props.navigation.navigate('EmergencyScreen')
          }
        style={styles.roundButton2}>
        <Text style={{color:"black",
fontSize:"20px",
fontWeight:"2px",
textAlign:"center"}}>Emergency SOS</Text>
      </TouchableOpacity>


     
<TouchableOpacity style={styles.button2}
onPress={()=>
this.props.navigation.navigate('CommunityScreen')
}
>

<Text style={styles.textButton}>COMMUNITY</Text>

</TouchableOpacity>


<TouchableOpacity style={styles.button2}
onPress={()=>
this.props.navigation.navigate('EducationScreen')
}
>

<Text style={styles.textButton}>EDUCATION</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.button2}

onPress={()=>this.props.navigation.navigate('TrainingCPRScreen')}>

<Text style={styles.textButton}>TRAINING</Text>
</TouchableOpacity>
</View>

    );
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
    backgroundColor: 'light grey',
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
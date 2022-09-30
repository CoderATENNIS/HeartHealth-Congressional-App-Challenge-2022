import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image } from "react-native";
import logo from '../assets/HeartLogo.png'
export default class HomeScreen extends Component {
  render() {
    return (
        
      <View style={styles.container}>
        <Image source={logo} style={styles.image} /> 
      
     
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
    backgroundColor: 'black',
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
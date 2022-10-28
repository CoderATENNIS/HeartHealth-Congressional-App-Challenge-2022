import React, { useState, useRef } from 'react';
import { View, Alert, StyleSheet, Icon, Text, Image } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';





const EducationScreen = () => {

  const [playing, setPlaying] = useState(false);

  const [isMute, setMute] = useState(false);
  // const controlRef = useRef();


  onStateChange = (state) => {

    if (state === 'ended') {

      setPlaying(false);

      Alert.alert('video has finished playing!');

    }

    if (state !== 'playing') {

      setPlaying(false);

    }

  };


  togglePlaying = () => {

    setPlaying((prev) => !prev);

  };



  muteVideo = () => setMute(!isMute);

  ControlIcon = ({ name, onPress }) => (

    <Icon onPress={onPress} name={name} size={40} color="#fff" />

  );
  // render() {
  return (

    <View style={styles.container}>

      <YoutubePlayer

        height={300}

        // ref={controlRef}

        play={playing}

        mute={isMute}

        videoId={'M4ACYp75mjU'}

        onChangeState={onStateChange}

      />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 24, alignSelf: 'center', color: "white", marginTop: -65 }}>How to Administer CPR</Text>
        <Text style={{ color: "white", marginTop: 15 }}>
          Cardiopulmonary resuscitation, or CPR, is an essential element of cardiac arrest response. There are four key steps to CPR:
        </Text>
        <Text style={{ color: "white", marginTop: 15 }}>
          1. Make sure the person is truly unconscious - shake their shoulder and ask, “Hey, hey, hey are you OK?
        </Text>
        <Text style={{ color: "white", marginTop: 15 }}>
          2.If there are bystanders nearby, make eye contact with one of them and say, “YOU - Call 911.” Otherwise, call 911 yourself(can access on our Emergency Screen) and put your phone on speaker.
        </Text>
        <Text style={{ color: "white", marginTop: 15 }}>
          3. Make eye contact with another bystander and say, “YOU - Go get an AED.” If no bystanders are present, continue to step 4.
        </Text>
        <Text style={{ color: "white", marginTop: 15 }}>
          4. Begin chest compressions. Place the heel of one hand on the sternum and the other directly on top. Press fast and hard at a rate of 100 compressions per minute.
        </Text>
      </View>
    </View>

  )

  // };
}


const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: 'grey',

  },

  controlContainer: {

    flexDirection: 'row',

    justifyContent: 'space-around',

  },


});

export default EducationScreen;
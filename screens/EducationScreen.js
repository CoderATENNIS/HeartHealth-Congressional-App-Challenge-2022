import React, { useState, useRef } from 'react';
import { View, Alert, StyleSheet, Icon } from 'react-native';
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


  seekBackAndForth = (control) => {

    console.log('currentTime');

    // controlRef.current?.getCurrentTime().then((currentTime) => {

    //   control === 'forward'

    //     ? controlRef.current?.seekTo(currentTime + 15, true)

    //     : controlRef.current?.seekTo(currentTime - 15, true);

    // });

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

        videoId={'84WIaK3bl_s'}

        onChangeState={onStateChange}

      />

      <View style={styles.controlContainer}>

        {/* <ControlIcon

          onPress={() => seekBackAndForth('rewind')}

          name="skip-previous"

        />

        <ControlIcon

          onPress={togglePlaying}

          name={playing ? 'pause' : 'play-arrow'}

        />
        <ControlIcon
          onPress={() => seekBackAndForth('forward')}

          name="skip-next"

        /> */}

      </View>

      {/* <ControlIcon

        onPress={muteVideo}

        name={isMute ? 'volume-up' : 'volume-off'}

      /> */}

    </View>

  )

  // };
}


const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: 'darkblue',

  },

  controlContainer: {

    flexDirection: 'row',

    justifyContent: 'space-around',

  },

});

export default EducationScreen;
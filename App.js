import React, { Component } from "react";
import BottomTabNavigator from "./components/bottomTabNavigator";
import { registerRootComponent } from 'expo';
//import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import EmergencyScreen from "./screens/EmergencyScreen";
import EducationScreen from "./screens/EducationScreen";
import RegisterAED from "./screens/RegisterAED";
import TrainingCPRScreen from "./screens/FindAEDScreen";
import { AppRegistry } from 'react-native';

export default class App extends Component {
  render() {
    return <BottomTabNavigator />;
  }
}

AppRegistry.registerComponent('main', () => App);

/*var AppNavigator = createSwitchNavigator({

  HomeScreen:HomeScreen,
  EducationScreen:EducationScreen,
  RegisterAED:RegisterAED,
  EmergencyScreen:EmergencyScreen,

})

const AppContainer = createAppContainer(AppNavigator)*/
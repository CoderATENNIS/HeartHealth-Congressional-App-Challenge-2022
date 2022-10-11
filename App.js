import React, { Component } from "react";
import BottomTabNavigator from "./components/bottomTabNavigator";
import { registerRootComponent } from 'expo';

import { AppRegistry } from 'react-native';

export default class App extends Component {
  render() {
    return <BottomTabNavigator />;
  }
}

AppRegistry.registerComponent('main', () => App);

import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen'
import EmergencyScreen from "../screens/EmergencyScreen";
import FindAEDScreen from '../screens/FindAEDScreen'
import EducationScreen from '../screens/EducationScreen'
import RegisterAED from '../screens/RegisterAED'

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Emergency') {
                iconName = focused
                  ? 'body'
                  : 'body';
              }
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              }

              if (route.name === 'Education') {
                iconName = focused
                  ? 'ios-pencil-outline'
                  : 'ios-pencil-outline';
              }
              if (route.name === 'Register AED') {
                iconName = 'ios-save-outline';
              }
              if (route.name === 'Find AED') {
                iconName = 'search-sharp';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Emergency" component={EmergencyScreen} />
          <Tab.Screen name="Education" component={EducationScreen} />
          <Tab.Screen name="Register AED" component={RegisterAED} />
          <Tab.Screen name="Find AED" component={FindAEDScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

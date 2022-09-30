import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TrainingScreen from '../screens/TrainingScreen'
import EducationScreen from '../screens/EducationScreen'
import CommunityScreen from '../screens/CommunityScreen'

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
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
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Education" component={EducationScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Training" component={TrainingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

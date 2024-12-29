import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Frontened/HomeScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import SettingsScreen from '../screens/Frontened/SettingsScreen';

import CreateEventScreen from '../screens/Frontened/CreateEventScreen';
import MyEventsScreen from '../screens/Frontened/MyEventsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide labels
        // activeTintColor: '#9775FA', // Color when tab is focused
        inactiveTintColor: 'grey', // Color when tab is not focused
        tabBarStyle: {
          backgroundColor: '#fff', // Tab bar background color
          borderTopWidth: 1, // Border at the top of the tab bar
          borderTopColor: '#ddd', // Border color
          borderTopRightRadius: 20, // Border radius at the top right
          borderTopLeftRadius: 20, // Border radius at the top left
          height: 60, // Tab bar height
          paddingTop: 5, // Padding at the top
          paddingBottom: 5, // Padding at the bottom
          shadowColor: '#000', // Shadow color for iOS
          shadowOffset: {width: 0, height: -3}, // Shadow offset for iOS
          shadowOpacity: 0.1, // Shadow opacity for iOS
          shadowRadius: 5, // Shadow radius for iOS
          elevation: 5, // Shadow for Android
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="home" // Home icon
              color={focused ? '#9775FA' : 'grey'} // Change color based on focus
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="pluscircleo" // Profile icon
              color={focused ? '#9775FA' : 'grey'} // Change color based on focus
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyEvents"
        component={MyEventsScreen}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="calendar" // Profile icon
              color={focused ? '#9775FA' : 'grey'} // Change color based on focus
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon
              name="user" // Profile icon
              color={focused ? '#9775FA' : 'grey'} // Change color based on focus
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import EditProfileScreen from '../screens/Frontened/EditProfileScreen';

import FavoritesScreen from '../screens/Frontened/FavoritesScreen';
import EventDetailsScreen from '../screens/Frontened/EventDetailsScreen';


const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
    

      <AppStack.Screen
        name="Tab"
        component={TabNavigator}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      
      <AppStack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
      />
      <AppStack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    
    </AppStack.Navigator>
  );
}

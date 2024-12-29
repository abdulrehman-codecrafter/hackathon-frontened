import {StatusBar} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigators/MainNavigator';
import {useAuth} from './src/contexts/AuthContext';
import SplashScreen from './src/components/SplashScreen';

export default function App() {
  const {isLoading} = useAuth();
  if (isLoading) {
    return (
      <SplashScreen />
    );
  }
  return (
    <>
      {/* <ActionSheetProvider> */}
        <StatusBar backgroundColor="#F5F6FA" barStyle="dark-content" />
        <MainNavigator />
      {/* </ActionSheetProvider> */}
    </>
  );
}

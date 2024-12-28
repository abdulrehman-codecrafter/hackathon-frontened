import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import MainNavigator from './src/navigators/MainNavigator'
import { useAuth } from './src/contexts/AuthContext'
import { ActivityIndicator } from 'react-native-paper'

export default function App() {
  const {isLoading}=useAuth()
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#F5F6FA'}}>
        <ActivityIndicator  />
      </View>
    )
  }
    return (
    <>
       <StatusBar 
        backgroundColor="#F5F6FA" 
        barStyle="dark-content" 
      />
      <MainNavigator />
    </>
  )
}